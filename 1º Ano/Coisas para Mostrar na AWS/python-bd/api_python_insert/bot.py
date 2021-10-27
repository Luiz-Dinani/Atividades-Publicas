import slack_sdk
import os
from  pathlib import Path
from  dotenv import load_dotenv 


load_dotenv()
env_path = Path('.') / './env'
load_dotenv(dotenv_path=env_path)

client = slack_sdk.WebClient(token=os.getenv('SLACK_TOKEN'))

def mensagem(txt):
    client.chat_postMessage(channel='#alerts', text=txt)