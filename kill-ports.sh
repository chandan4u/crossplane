#!/bin/bash
# Kill processes on ports 3000 and 7007

for port in 3000 7007; do
  pid=$(lsof -ti tcp:$port)
  if [ -n "$pid" ]; then
    echo "Killing process on port $port (PID $pid)"
    kill -9 $pid
  else
    echo "No process running on port $port"
  fi
done
