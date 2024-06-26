import { Plugin } from 'obsidian';
import { OrganiseCommand } from 'src/command';
import { DEFAULT_SETTINGS } from 'src/data';
import { App } from 'obsidian';
import { InboxOrganiseSettingsTab } from 'src/settings';
import { COMMAND_NAME } from 'src/content';



export default class InboxOrganisePlugin extends Plugin {

	settings: typeof DEFAULT_SETTINGS;

	constructor(app: App, plugin: InboxOrganisePlugin) {
		super(app, plugin);
		this.plugin = plugin;
		this.settings = Object.assign({}, DEFAULT_SETTINGS);
	}

	async onload() {
		await this.loadSettings();

		this.addCommand({
			id: 'process-inbox-files',
			name: COMMAND_NAME,
			callback: () => new OrganiseCommand(this.app, this.settings),
		});
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
		
		this.addSettingTab(new InboxOrganiseSettingsTab(this.app, this));
	}


	async saveSettings() {
		await this.saveData(this.settings);
	}
}