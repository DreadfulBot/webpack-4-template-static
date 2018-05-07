import subprocess

source = os.path.dirname(__file__)
parent = os.path.join(source, '../')

subprocess.call("git pull origin")
