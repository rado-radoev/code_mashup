import json, requests


url = 'https://api.github.com/search/repositories?q=language:python&sort=stars&order=asc'

response = requests.get(url)
json_respone = response.json()

total_count = json_respone['total_count']

for repo in json_respone['items']:
    repo_id = repo['id']
    repo_name = repo['name']
    repo_owner = repo['owner']['login']
    repo_owner_url = repo['owner']['html_url']
    repo_url = repo['svn_url']

    print(f'Repo id; {repo_id}\n'
          f'Repo name: {repo_name}\n'
          f'Repo url: {repo_url}\n'
          f'Repo owner: {repo_owner}\n'
          f'Repo owner url: {repo_owner_url}'
          f'\n\n\n')
