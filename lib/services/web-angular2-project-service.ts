import * as path from "path";
import * as shell from "shelljs";
import Future = require("fibers/future");
import * as constants from "../constants";
import * as semver from "semver";
import * as projectServiceBaseLib from "./platform-project-service-base";
import {EOL} from "os";
import { createGUID } from "../common/helpers";

export class WebAngular2ProjectService extends projectServiceBaseLib.PlatformProjectServiceBase implements IPlatformProjectService {
    private static REQUIRED_DEV_DEPENDENCIES = [
        { name: "angularjs", version: "2.0-rc1" }
    ];

	private get sysInfoData(): ISysInfoData {
		return this.$sysInfo.getSysInfo(path.join(__dirname, "..", "..", "package.json")).wait();
	}

    private _webAngular2ProjectPropertiesManagers: IDictionary<IWebAngular2ProjectPropertiesManager>;

    constructor(
        private $webAngular2EmulatorServices: Mobile.IEmulatorPlatformServices,
        // TODO @jelavallee - Implement a webAngular2ToolsInfo interface/component
        private $webAngular2ToolsInfo: IWebAngular2ToolsInfo,
        private $childProcess: IChildProcess,
        private $errors: IErrors,
        $fs: IFileSystem,
        private $hostInfo: IHostInfo,
        private $logger: ILogger,
        private $options: IOptions,
        $projectData: IProjectData,
        $projectDataService: IProjectDataService,
        private $sysInfo: ISysInfo,
        // private $mobileHelper: Mobile.IMobileHelper,
        private $injector: IInjector,
        private $pluginVariablesService: IPluginVariablesService,
        // private $deviceAppDataFactory: Mobile.IDeviceAppDataFactory,
        // private $devicePlatformsConstants: Mobile.IDevicePlatformsConstants,
        private $projectTemplatesService: IProjectTemplatesService,
        private $xmlValidator: IXmlValidator,
        private $npm: INodePackageManager) {
        super($fs, $projectData, $projectDataService);
        this._webAngular2ProjectPropertiesManagers = Object.create(null);
    }

    private _platformData: IPlatformData = null;
    public get platformData(): IPlatformData {
        if (!this._platformData) {
            let projectRoot = path.join(this.$projectData.platformsDir, "web-angularjs2");
            let packageName = this.getProjectNameFromId();
            this._platformData = {
                frameworkPackageName: "tns-web-angular2",
                normalizedPlatformName: "WebAngular2",
                // TODO @jelavallee - target this to web app appropriate location...
                appDestinationDirectoryPath: path.join(projectRoot, "src", "main", "assets"),
                platformProjectService: this,
                projectRoot: projectRoot,
                // TODO @jelavallee - target this to web app appropriate gulp commands...
                deviceBuildOutputPath: path.join(projectRoot, "build", "outputs", "apk"),
                // TODO @jelavallee - purge this?
                validPackageNamesForDevice: [],
                // TODO @jelavallee - target this to web app appropriate extensions...
                frameworkFilesExtensions: [".jar", ".dat", ".so"],
                configurationFileName: "package.json",
                // TODO @jelavallee - target this to web app appropriate location...
                configurationFilePath: path.join(projectRoot, "src", "main", "AndroidManifest.xml"),
                relativeToFrameworkConfigurationFilePath: path.join("src", "main", "AndroidManifest.xml"),
                // TODO @jelavallee - target this to web app appropriate formats...
                fastLivesyncFileExtensions: [".jpg", ".gif", ".png", ".bmp", ".webp"],
                emulatorServices: this.$webAngular2EmulatorServices
            };
        }

        return this._platformData;
    }

	public getAppResourcesDestinationDirectoryPath(frameworkVersion?: string): IFuture<string> {
		return (() => {
			if (this.canUseGulp(frameworkVersion).wait()) {
				return path.join(this.platformData.projectRoot, "src", "main", "res");
			}

			return path.join(this.platformData.projectRoot, "res");
		}).future<string>()();
	}

	public validate(): IFuture<void> {
		return (() => {
			this.validatePackageName(this.$projectData.projectId);
			this.validateProjectName(this.$projectData.projectName);
		}).future<void>()();
	}

	public createProject(frameworkDir: string, frameworkVersion: string, pathToTemplate?: string): IFuture<void> {
        return (() => {}).future<any>()();
    }

	public interpolateData(): IFuture<void> {
		return (() => {
			this.interpolateConfigurationFile().wait();
            // TODO @jelavallee - Resolve additonal interpolation targets
		}).future<void>()();
	}

	public interpolateConfigurationFile(): IFuture<void> {
		return (() => {
            // TODO @jelavallee - Resolve additonal interpolation targets
			let manifestPath = this.platformData.configurationFilePath;
		}).future<void>()();
	}

    private getProjectNameFromId(): string {
        let id: string;
        if (this.$projectData && this.$projectData.projectId) {
            id = this.$projectData.projectId.split(".")[2];
        }

        return id;
    }

	public afterCreateProject(projectRoot: string): IFuture<void> {
		return Future.fromResult();
	}

	public canUpdatePlatform(currentVersion: string, newVersion: string): IFuture<boolean> {
		return Future.fromResult(true);
	}

	public updatePlatform(currentVersion: string, newVersion: string, canUpdate: boolean, addPlatform?: Function, removePlatforms?: (platforms: string[]) => IFuture<void>): IFuture<boolean> {
		return (() => {
            // TODO @jelavallee - Implement web platform update logic
			return true;
		}).future<boolean>()();
	}

	public buildProject(projectRoot: string, buildConfig?: IBuildConfig): IFuture<void> {
		return (() => {
			if (this.canUseGulp().wait()) {
			    // do stuff...
            } else {
				this.$errors.failWithoutHelp("Cannot complete build because this project is ANT-based." + EOL +
					"Run `tns platform remove android && tns platform add android` to switch to Gradle and try again.");
			}
		}).future<void>()();
	}

	public buildForDeploy(projectRoot: string, buildConfig?: IBuildConfig): IFuture<void> {
		return this.buildProject(projectRoot, buildConfig);
	}

	public isPlatformPrepared(projectRoot: string): IFuture<boolean> {
		return this.$fs.exists(path.join(this.platformData.appDestinationDirectoryPath, constants.APP_FOLDER_NAME));
	}

	public getFrameworkFilesExtensions(): string[] {
		return [".jar", ".dat"];
	}

	public prepareProject(): IFuture<void> {
		return (() => {
            // TODO @jelavallee - Implement project structure prep logic
            return;
		}).future<void>()();
	}

	public ensureConfigurationFileInAppResources(): IFuture<void> {
		return (() => {
            // TODO @jelavallee - Implement project structure validation logic
            return;
		}).future<void>()();
	}

	public prepareAppResources(appResourcesDirectoryPath: string): IFuture<void> {
		return (() => {
            // TODO @jelavallee - Implement project resource prep logic
		}).future<void>()();
	}

	public preparePluginNativeCode(pluginData: IPluginData): IFuture<void> {
		return Future.fromResult();
	}

	public processConfigurationFilesFromAppResources(): IFuture<void> {
		return Future.fromResult();
	}

	private processResourcesFromPlugin(pluginData: IPluginData, pluginPlatformsFolderPath: string): IFuture<void> {
		return Future.fromResult();
	}

	public removePluginNativeCode(pluginData: IPluginData): IFuture<void> {
		return Future.fromResult();
	}

	public afterPrepareAllPlugins(): IFuture<void> {
		return Future.fromResult();
	}

	public deploy(deviceIdentifier: string): IFuture<void> {
		return (() => {
            // TODO @jelavallee - Implement web deployer logic
		}).future<void>()();
	}

	private _canUseGulp: boolean;
	private canUseGulp(frameworkVersion?: string): IFuture<boolean> {
		return (() => {
            // TODO @jelavallee - Implement gulp avaliability validation
            return true;
			// return this._canUseGulp;
		}).future<boolean>()();
	}

	private copy(projectRoot: string, frameworkDir: string, files: string, cpArg: string): void {
		let paths = files.split(' ').map(p => path.join(frameworkDir, p));
		shell.cp(cpArg, paths, projectRoot);
	}

	private spawn(command: string, args: string[], opts?: any): IFuture<void> {
		return this.$childProcess.spawnFromEvent(command, args, "close", opts || { stdio: "inherit" });
	}

	private validatePackageName(packageName: string): void {
        // TODO @jelavallee - Make the package conform to Javascript/Typescript naming conventions
		//Enforce underscore limitation
		if (!/^[a-zA-Z]+(\.[a-zA-Z0-9][a-zA-Z0-9_]*)+$/.test(packageName)) {
			this.$errors.fail("Package name must look like: com.company.Name");
		}

		//Class is a reserved word
		if (/\b[Cc]lass\b/.test(packageName)) {
			this.$errors.fail("class is a reserved word");
		}
	}

	private validateProjectName(projectName: string): void {
		if (projectName === '') {
			this.$errors.fail("Project name cannot be empty");
		}

		//Classes in Java don't begin with numbers
		if (/^[0-9]/.test(projectName)) {
			this.$errors.fail("Project name must not begin with a number");
		}
	}

}
$injector.register("webAngular2ProjectService", WebAngular2ProjectService);
