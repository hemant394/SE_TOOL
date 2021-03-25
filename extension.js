/* eslint-disable no-undef */
const vscode = require("vscode")
const editor = vscode.window.activeTextEditor;
const fetch = require('node-fetch');
const axios = require("axios")
const xmlParser = require("fast-xml-parser")

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {

	// const error_ = await vscode.window.onDidWriteTerminalData((e) => {return e.data})
	// 	console.log(error_);

  let disposable = vscode.commands.registerCommand(
    "search-c---error.SearchSelectedText",
     async function () {

		const text = editor.document.getText(editor.selection);
		
		var url = 'https://api.stackexchange.com/2.2/search/advanced?order=desc&sort=relevance&accepted=True&answers=1&site=stackoverflow';
		url += '&q=' + encodeURIComponent(text);
		url += '&tagged=' + encodeURIComponent("c++");
		var res = await fetch(url);
		var json = await res.json();
		console.log(json)
		if (json == null) return
		console.log(text);
		const articles = json.items.map(article => {
			return {
			label: article.title,
			detail: article.link,
			link: article.link,
			}
		}  )

		console.log(articles);
		//const article = articles[0];
		

      const article = await vscode.window.showQuickPick(articles, {
        matchOnDetail: true,
      })

      	if (article == null) return
      	vscode.env.openExternal(article.link)
		console.log(json.items);	 

    }
  )

  context.subscriptions.push(disposable)
}
exports.activate = activate

function deactivate() {}

module.exports = {
  activate,
  deactivate,
}