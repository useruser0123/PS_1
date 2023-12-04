class MyScene extends Phaser.Scene {

    constructor() {
        super({ key: 'MyScene1', active: true });
    }

    preload() {
        this.load.image('background', 'assets/background.png');
        this.load.image('taro', 'assets/taro.png');
        this.load.image('jiro', 'assets/jiro.png');
        this.load.image('hanako', 'assets/hanako.png');
    }

    create() {
        this.add.image(D_WIDTH / 2, D_HEIGHT / 2, 'background');

        // taroの初期設定
        this.player = this.physics.add.sprite(500, 350, 'taro');
        this.player.angle = 0;
        this.player_direction = 1;

        // jiroの初期設定
        this.player2 = this.physics.add.sprite(500, 300, 'jiro');
        this.player2.direction = 1;

        // 新しく追加した部分
        this.add.text(600, 400, 'MyWorld');

        // 画面外に出た場合の処理（taro）
        if (this.player.x < 0 || this.player.x > D_WIDTH || this.player.y < 0 || this.player.y > D_HEIGHT) {
            this.player.x = D_WIDTH / 2;
            this.player.y = D_HEIGHT / 2;
        }

        // 画面外に出た場合の処理（jiro）
        if (this.player2.x < 0 || this.player2.x > D_WIDTH || this.player2.y < 0 || this.player2.y > D_HEIGHT) {
            this.player2.x = D_WIDTH / 2;
            this.player2.y = D_HEIGHT / 2;
        }
        // w キーの入力を処理する
        this.image_x = Phaser.Math.Between(100, 400);
        this.hanako = this.add.image(this.image_x, 100, 'hanako');

        this.input.keyboard.on('keydown-W', function (event) {
            this.hanako.destroy();
            this.image_x = Phaser.Math.Between(100, 400);
            this.hanako = this.add.image(this.image_x, 100, 'hanako');
        }, this);
    }

    update(time, delta) {
        // 演習 1-4の部分（キーボード操作）をコメントアウト
        // ...

        // キーボードの入力を処理する
        this.handleTaroKeyboardInput();
        this.handleJiroKeyboardInput();
        this.handleTextDisplayInput();
    }

    // taro用のキーボード入力を処理する関数
    handleTaroKeyboardInput() {
        // キーボードの右矢印キーを押すと taro が右に 50 動く
        if (this.input.keyboard.addKey('RIGHT').isDown) {
            this.player.setVelocityX(50);
        }
        // キーボードの左矢印キーを押すと taro が左に 50 動く
        else if (this.input.keyboard.addKey('LEFT').isDown) {
            this.player.setVelocityX(-50);
        }
        // キーが押されていない場合、速度をリセット
        else {
            this.player.setVelocityX(0);
        }
    }

    // jiro用のキーボード入力を処理する関数
    handleJiroKeyboardInput() {
        // キーボードの右矢印キーを押すと jiro が左に 50 動く
        if (this.input.keyboard.addKey('RIGHT').isDown) {
            this.player2.setVelocityX(-50);
        }
        // キーボードの左矢印キーを押すと jiro が右に 50 動く
        else if (this.input.keyboard.addKey('LEFT').isDown) {
            this.player2.setVelocityX(50);
        }
        // キーが押されていない場合、速度をリセット
        else {
            this.player2.setVelocityX(0);
        }
    }

    handleTextDisplayInput() {
        // キーボードの a キーを押すと座標 (100, 50)に文字列 "Hello!" と表示
        if (this.input.keyboard.addKey('A').isDown) {
            this.displayText(100, 50, 'Hello!');
        }

        // キーボードの s キーを押すと座標 (100, 50)に文字列 "Hey!" と表示
        if (this.input.keyboard.addKey('S').isDown) {
            this.displayText(100, 50, 'Hey!');
        }

        // キーボードの d キーを押すと文字列を消す
        if (this.input.keyboard.addKey('D').isDown) {
            this.clearText();
        }
    }

    displayText(x, y, text) {
        this.clearText();
        this.add.text(x, y, text);
    }

    clearText() {
        const textObject = this.children.getAt(this.children.length - 1);
        if (textObject instanceof Phaser.GameObjects.Text) {
            textObject.destroy();
        }
    }
}
