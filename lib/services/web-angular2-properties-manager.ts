import * as path from "path";

export class WebAngular2ProjectPropertiesManager implements IWebAngular2ProjectPropertiesManager {
	private filePath: string = null;

	constructor(private $propertiesParser: IPropertiesParser,
		private $fs: IFileSystem,
		private $logger: ILogger,
		directoryPath: string) {
		this.filePath = path.join(directoryPath, "project.properties");
	}
	public getProjectReferences(): IFuture<ILibRef[]> {
		return (() => {
			return {
				idx: 1,
				key: 'webReferenceName',
				path: 'webReferencePath',
				adjustedPath: path.join(path.dirname(this.filePath), 'webReferencePath')
			}
		}).future<ILibRef[]>()();
	}
}
