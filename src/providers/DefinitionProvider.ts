import * as vscode from 'vscode';
import SettingUtils from '../SettingUtils';




export default class DefinitionProvider implements vscode.DefinitionProvider {
	provideDefinition(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): vscode.ProviderResult<vscode.Definition> {
		let keyRange;
		let key;

		if (SettingUtils.isResourceFilePath(document.uri.fsPath)) {
			keyRange = document.getWordRangeAtPosition(position, SettingUtils.getResourceLineRegex());
			key = document.getText(keyRange);
		} else {
			//OBSOLETE//keyRange = document.getWordRangeAtPosition(position, SettingUtils.getResourceCodeRegex());
			let keyRange: vscode.Range | undefined;
			for (const regex of SettingUtils.getResourceCodeRegex()) {
				keyRange = document.getWordRangeAtPosition(position, regex);
				if (keyRange) {
					break;
				}
			}			
			key = document.getText(keyRange);
		}

		const locations = SettingUtils.getResourceLocationsByKey(key) || [];
		return locations;
	}
}