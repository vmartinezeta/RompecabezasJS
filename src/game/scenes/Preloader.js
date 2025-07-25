import { Scene } from 'phaser'

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

    init ()
    {
        //  We loaded this image in our Boot Scene, so we can display it here
        // this.add.image(512, 384, 'background');

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(512-230, 384, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress) => {

            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress);

        });
    }

    preload ()
    {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('assets');
        this.load.image("background", "bg.png")
        this.load.image("original", "original.jpg")
        this.load.image("pieza_1", "1.jpg")
        this.load.image("pieza_2", "2.jpg")
        this.load.image("pieza_3", "3.jpg")
        this.load.image("pieza_4", "4.jpg")
        this.load.image("pieza_5", "5.jpg")
        this.load.image("pieza_6", "6.jpg")
        this.load.image("pieza_7", "7.jpg")
        this.load.image("pieza_8", "8.jpg")
    }

    create ()
    {        
        this.scene.start('MainMenu');
    }
}
