
## Getting Started with Dev Containers

1. Get set up with Visual Studio Code insiders, Docker and remote extensions [instructions here](https://vscode-docs-remote.azurewebsites.net/docs/remote/remote-overview#_getting-started)

1. If on windows, set git to use LF line endings: 
    ```
    git config --global core.autocrlf false
    ```
1. Clone repo 
    ```
    git clone https://dev.azure.com/Microsoft/python-sample-tweeterapp
    ```
1. From Visual Studio Code Insiders, run the ```Remote-Containers: Open Folder in Container...``` and select the ```python-sample-tweeterapp``` folder

After the dev container has installed and files appear in the explorer, you are good to go!

## Run some code!

Open the integrated terminal with ```Ctrl-` ```, and run:

```
python manage.py migrate
python manage.py loaddata initial_data
python manage.py runserver
```


# Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
