# chatbot.py
# Import Dependencies
import openai
import tiktoken
from clickhouse_driver import Client
import settings

# Client Connection
client = Client(host=settings.CLICKHOUSE_CONNECTION_DETAILS["host"],
                    port=settings.CLICKHOUSE_CONNECTION_DETAILS["port"],
                    user=settings.CLICKHOUSE_CONNECTION_DETAILS["username"],
                    password=settings.CLICKHOUSE_CONNECTION_DETAILS["password"])

# print host, port, user, password
print(settings.CLICKHOUSE_CONNECTION_DETAILS["host"])
print(settings.CLICKHOUSE_CONNECTION_DETAILS["port"])
print(settings.CLICKHOUSE_CONNECTION_DETAILS["username"])
print(settings.CLICKHOUSE_CONNECTION_DETAILS["password"])

# OpenAI API key
openai.api_key = settings.OPENAI_API_KEY

# Configurations
GPT_MODEL = "gpt-3.5-turbo"

def test_connection():
    try:
        print(f"Connection to ClickHouse server successful")
    except Exception as e:
        print(f"Connection to ClickHouse server failed")

def strings_ranked_by_relatedness(query: str) -> list[str]:
    """
    Returns a list of strings ranked by relatedness to the given query
    
    Args:
        query (str): Query string

    Returns:
        list[str]: List of strings ranked by relatedness to the given query
    """
    
    # Creates Embedding Vector from Query
    embed = openai.Embedding.create(
        input=query,
        model="text-embedding-ada-002",
    )["data"][0]["embedding"]

    # Query for Top K Similar Cases
    top_k = 10
    results = []  # Initialize the variable as an empty list

    try:
        results = client.execute(f"""
            SELECT id, text, distance(embedding, {embed}) as dist
            FROM default.hopkins_art
            ORDER BY dist
            LIMIT {top_k}
        """)
    except Exception as e: 
        print(f"Error: Query failed - {e}")

    # Top K Results
    return results



def num_tokens(text: str, model: str = GPT_MODEL) -> int:
    """
    Return the number of tokens in a string
    
    Args:
        text (str): String to count tokens
        
    Returns:
        int: Number of tokens in the string
    """
    encoding = tiktoken.encoding_for_model(model)
    return len(encoding.encode(text))


def query_message(query: str, model: str, token_budget: int) -> str:
    """
    Return a message for GPT, with relevant source texts pulled from a dataframe.
    
    Args:
        query (str): Query string

    Returns:
        str: Message for GPT
    """

    # Get Strings Ranked by Relatedness
    strings = strings_ranked_by_relatedness(query)
    
    # Prompt (TODO: Hallucinate for better prompts)
    question = f"\n\nQuestion: {query}"
    message = 'Use the below website information below to answer questions about the Johns Hopkins University. If the website information does not specify enough information, use previous knowledge to answer the question.'

    for string in strings:
        next_article = f'\n\nJohns Hopkins article section:\n"""\n{string}\n"""'
        # Check if adding the next article will exceed the token budget
        if (
            num_tokens(message + next_article + question, model=model)
            > token_budget
        ):
            break
        else:
            message += next_article
    return message + question


def ask(query: str, model: str = GPT_MODEL, token_budget: int = 4096 - 500, print_message: bool = True,) -> str:
    """
    Answers a query using GPT and a dataframe of relevant texts and embeddings.
    
    Args:
        query (str): Query string
        model (str): GPT model to use
        
    Returns:
        str: Answer to the query
    """
    message = query_message(query, model=model, token_budget=token_budget)
    if print_message:
        print(message)
    messages = [
        {"role": "system", "content": "You answer questions about student affairs at the Johns Hopkins University"},
        {"role": "user", "content": message},
    ]
    response = openai.ChatCompletion.create(
        model=model,
        messages=messages,
        temperature=0
    )
    response_message = response["choices"][0]["message"]["content"]
    return response_message

test_connection()