import * as path from "path";
import * as semver from "semver";
import {EOL} from "os";

export class WebAngular2ToolsInfo implements IWebAngular2ToolsInfo {
	// TODO @jelavallee - Implement an appropriate web tool info structure...
    private static ANDROID_TARGET_PREFIX = "android";
	private static SUPPORTED_TARGETS = ["android-17", "android-18", "android-19", "android-21", "android-22", "android-23"];
	private static MIN_REQUIRED_COMPILE_TARGET = 22;
	private static REQUIRED_BUILD_TOOLS_RANGE_PREFIX = ">=23";
	private static VERSION_REGEX = /((\d+\.){2}\d+)/;
	private static MIN_JAVA_VERSION = "1.8.0";

	private showWarningsAsErrors: boolean;
	private toolsInfo: IWebAngular2ToolsInfoData;
	private selectedCompileSdk: number;
	private installedTargetsCache: string[] = null;
	private androidHome = process.env["ANDROID_HOME"];
	private pathToAndroidExecutable: string;
	private _androidExecutableName: string;
	private get androidExecutableName(): string {
		if (!this._androidExecutableName) {
			this._androidExecutableName = "android";
			if (this.$hostInfo.isWindows) {
				this._androidExecutableName += ".bat";
			}
		}

		return this._androidExecutableName;
	}

	constructor(private $childProcess: IChildProcess,
		private $errors: IErrors,
		private $fs: IFileSystem,
		private $hostInfo: IHostInfo,
		private $logger: ILogger,
		private $options: IOptions,
		private $adb: Mobile.IAndroidDebugBridge) { }

	public getToolsInfo(): IFuture<IWebAngular2ToolsInfoData> {
		return ((): IWebAngular2ToolsInfoData => {
			if (!this.toolsInfo) {
				let infoData: IWebAngular2ToolsInfoData = Object.create(null);
				this.toolsInfo = infoData;
			}

			return this.toolsInfo;
		}).future<IWebAngular2ToolsInfoData>()();
	}

	public validateInfo(options?: { showWarningsAsErrors: boolean, validateTargetSdk: boolean }): IFuture<boolean> {
		return ((): boolean => {
			let detectedErrors = false;

			return detectedErrors = true;
		}).future<boolean>()();
	}
}
$injector.register("webAngular2ToolsInfo", WebAngular2ToolsInfo);
