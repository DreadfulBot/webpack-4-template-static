import subprocess
import sys
import os

source = os.path.dirname(__file__)
parent = os.path.join(source, '../')

if(len(sys.argv) < 2):
    comment = "fixes"
else:
    comment = sys.argv[1]

subprocess.call("git add .", shell=True, cwd=parent)
subprocess.call(f"git commit -m \"{comment:s}\"")
subprocess.call("git push origin master")
