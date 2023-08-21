export type Categories = 'sveltekit' | 'svelte' | string

export type Post = {
	title: string
	slug: string
	description: string
	date: string
	tags: Categories[]
	// published: boolean
}

export type GetShareImageOptions = {
    title: any;
    tagline: any;
    cloudName: any;
    imagePublicID: any;
    cloudinaryUrlBase?: string;
    titleFont?: string;
    titleExtraConfig?: string;
    taglineExtraConfig?: string;
    taglineFont?: string;
    imageWidth?: number;
    imageHeight?: number;
    textAreaWidth?: number;
    textLeftOffset?: number;
    titleGravity?: string;
    taglineGravity?: string;
    titleLeftOffset?: any;
    taglineLeftOffset?: any;
    titleBottomOffset?: number;
    taglineTopOffset?: number;
    textColor?: string;
    titleColor: any;
    taglineColor: any;
    titleFontSize?: number;
    taglineFontSize?: number;
    version?: any;
  }