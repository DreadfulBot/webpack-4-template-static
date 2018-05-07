import subprocess
import sys

if(len(sys.argv) < 2):
    comment = "fixes"
else:
    comment = sys.argv[1]

subprocess.call(f"git commit -m \"{comment:s}\"")
subprocess.call("git add .")
subprocess.call("git push origin master")
