// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { encode } from "./encoder";
import { TokensOutput } from "./tokensOutput";
import { TiktokenModel } from "tiktoken";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Started "tiktokens" extension');

  context.subscriptions.push(
    vscode.commands.registerCommand("tiktokens.outputTokens", () => {
      encodeCurrentTextAndProcess((tokensOutput) => {
        vscode.workspace
          .openTextDocument({
            content: JSON.stringify(tokensOutput, null, 2),
            language: "json",
          })
          .then((doc) => {
            vscode.window.showTextDocument(doc);
          });
      });
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("tiktokens.countTokens", () => {
      encodeCurrentTextAndProcess((tokensOutput) => {
        vscode.window.showInformationMessage(`Encoded tokens count: ${tokensOutput.count}`);
      });
    })
  );
}

// This method is called when your extension is deactivated
export function deactivate() {}

export function encodeCurrentTextAndProcess(processFunction: (tokensOutput: TokensOutput) => void) {
  const currentContent = vscode.window.activeTextEditor?.document.getText();
  if (currentContent) {
    const model = vscode.workspace.getConfiguration("tiktokens").get("encoderForModel");

    // check if model is a string and is part of the TiktokenModel type
    const parsedModel: TiktokenModel = model as TiktokenModel;
    if (!parsedModel) {
      console.error("Invalid model defined in configuration. Will use the default one.");
    }

    const encodedTokens = encode(currentContent, parsedModel);
    const tokensOutput = new TokensOutput(encodedTokens);
    processFunction(tokensOutput);
  } else {
    console.log("No active content. Nothing to process.");
  }
}
