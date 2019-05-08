import os
import subprocess
import urllib.request
import dotenv

# Load dotenv file 
dotenv.load_dotenv()

REQUIRED_ENV_VARS = (
    'DB_USER',
    'DB_PASSWORD',
    'DB_NAME', 
    'DB_HOST'
)

AZ_GROUP=os.getenv('AZ_GROUP', 'appsvc_rg_linux_centralus')
AZ_LOCATION=os.getenv('AZ_LOCATION', 'Central US')
create_group_command = [
    "az", "group", "create",
    "--name", AZ_GROUP,
    "--location", AZ_LOCATION
]
print("Creating resource group if needed...")
subprocess.call(create_group_command, shell=True)

missing = []
for v in REQUIRED_ENV_VARS:
    if v not in os.environ:
        missing.append(v)
if missing:
    print("Required Environment Variables Unset:")
    print("\t" + "\n\t".join(missing))
    print("Exiting.")
    exit()

print("This script will take about 3 minutes to run.")

# Ref: https://docs.microsoft.com/en-gb/cli/azure/postgres/server?view=azure-cli-latest#az-postgres-server-create
# SKUs: https://docs.microsoft.com/en-us/azure/postgresql/concepts-pricing-tiers
#       {pricing tier}_{compute generation}_{vCores}
create_server_command = [
    'az', 'postgres', 'server', 'create',
    '--resource-group', AZ_GROUP,
    '--location', AZ_LOCATION,
    '--name', os.getenv('DB_HOST'),
    '--admin-user', os.getenv('DB_USER'),
    '--admin-password', os.getenv('DB_PASSWORD'),
    '--sku-name', 'B_Gen5_1',
]

print("Creating PostgreSQL server...")
subprocess.check_call(create_server_command, shell=True)

# Set up firewall.
# Ref: https://docs.microsoft.com/en-gb/cli/azure/postgres/server/firewall-rule?view=azure-cli-latest#az-postgres-server-firewall-rule-create
azure_firewall_command = [
    'az', 'postgres', 'server', 'firewall-rule', 'create',
    '--resource-group', AZ_GROUP,
    '--server-name', os.getenv('DB_HOST'),
    '--start-ip-address', '0.0.0.0',
    '--end-ip-address', '0.0.0.0',
    '--name', 'AllowAllAzureIPs',
]

with urllib.request.urlopen('http://ip.42.pl/raw') as f:
    my_ip = f.read().decode("utf-8")

local_ip_firewall_command = [
    'az', 'postgres', 'server', 'firewall-rule', 'create',
    '--resource-group', AZ_GROUP,
    '--server-name', os.getenv('DB_HOST'),
    '--start-ip-address', my_ip,
    '--end-ip-address', my_ip,
    '--name', 'AllowMyIP',
]

print("Allowing access from Azure...")
subprocess.check_call(azure_firewall_command, shell=True)
print("Allowing access from local IP...")
subprocess.check_call(local_ip_firewall_command, shell=True)

create_db_command = [
    'az', 'postgres', 'db', 'create',
    '--resource-group', AZ_GROUP,
    '--server-name', os.getenv('DB_HOST'),
    '--name', os.getenv('DB_NAME'),
]

print("Creating App DB...")
subprocess.check_call(create_db_command, shell=True)

connect_details_command = [
    'az', 'postgres', 'server', 'show',
    '--resource-group', AZ_GROUP,
    '--name', os.getenv('DB_HOST'),
]
print("Getting access details...")
subprocess.check_call(connect_details_command, shell=True)
