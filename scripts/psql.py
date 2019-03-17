import os
import subprocess
import urllib.request
import dotenv

dotenv.read_dotenv(os.getcwd() + "/.env")

REQUIRED_ENV_VARS = (
    'DB_USER',
    'DB_PASSWORD',
    'DB_NAME', 
    'DB_HOST'
)

missing = []
for v in REQUIRED_ENV_VARS:
    if v not in os.environ:
        missing.append(v)
if missing:
    print("Required Environment Variables Unset:")
    print("\t" + "\n\t".join(missing))
    print("Exiting.")
    exit()

# psql_command = [
#     'psql', 
#     f"host={os.environ.get('DB_HOST')}.postgres.azure.com",
#     'sslmode=require',
#     'port=5432',
#     f"user={os.environ.get('DB_USER')}@{os.environ.get('DB_HOST')}",
#     f"dbname={os.environ.get('DB_NAME')}"
# ]

os.environ.setdefault('PGPASSWORD', os.environ.get('DB_PASSWORD'))

psql_command = [
    "psql",
    "-v", f"db_password=\"'{os.environ.get('DB_PASSWORD')}",
    "-h", f"{os.environ.get('DB_HOST')}.postgres.database.azure.com",
    "-U", f"{os.environ.get('DB_USER')}@{os.environ.get('DB_HOST')}",
    "postgres"
]
subprocess.check_call(psql_command, shell=True)
