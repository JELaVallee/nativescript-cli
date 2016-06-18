export class PlatformsData implements IPlatformsData {
	private platformsData : { [index: string]: any } = {};

	constructor($androidProjectService: IPlatformProjectService,
		$iOSProjectService: IPlatformProjectService,
		$webAngular2ProjectService: IPlatformProjectService) {

        // TODO @jelavallee - Extend this to include web target... or repo lookup in future...
		this.platformsData = {
			ios: $iOSProjectService.platformData,
			android: $androidProjectService.platformData,
			webangular2: $webAngular2ProjectService.platformData
		};
	}

	public get platformsNames() {
		return Object.keys(this.platformsData);
	}

	public getPlatformData(platform: string): IPlatformData {
		return this.platformsData[platform.toLowerCase()];
	}

    // TODO @jelavallee - Would be nice to do these with dash-sep package-naming-style
	public get availablePlatforms(): any {
		return {
			iOS: "ios",
			Android: "android",
            WebAngular2: "webangular2"
		};
	}
}
$injector.register("platformsData", PlatformsData);
