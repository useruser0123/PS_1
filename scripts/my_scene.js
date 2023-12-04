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

        // hanakoグループの初期設定
        this.hanakoGroup = this.physics.add.group();

        // 新しく追加した部分
        this.add.text(600, 400, 'MyWorld');

        // タイマーの設定
        this.time.addEvent({
            delay: 3000,
            callback: this.generateHanako,
            callbackScope: this,
            loop: false
        });

        // 衝突時のイベントを追加
        this.physics.add.collider(this.player, this.hanakoGroup, this.handleCollision, null, this);
    }

    update(time, delta) {
        // キーボードの入力を処理する
        this.handleTaroKeyboardInput();
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
        // キーボードの上矢印キーを押すと taro が上に 50 動く
        else if (this.input.keyboard.addKey('UP').isDown) {
            this.player.setVelocityY(-50);
        }
        // キーボードの下矢印キーを押すと taro が下に 50 動く
        else if (this.input.keyboard.addKey('DOWN').isDown) {
            this.player.setVelocityY(50);
        }
        // キーが押されていない場合、速度をリセット
        else {
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);
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
        this.add.text(x, y, text, { fontFamily: 'Meiryo' });
    }

    clearText() {
        const textObject = this.children.getAt(this.children.length - 1);
        if (textObject instanceof Phaser.GameObjects.Text) {
            textObject.destroy();
        }
    }

    // hanakoオブジェクトをランダムな座標に移動する関数
    moveHanakoRandomly() {
        // hanakoが1体しかない場合のみ移動
        if (this.hanakoGroup.children.size === 1) {
            const hanako = this.hanakoGroup.getFirst(true);
            hanako.x = Phaser.Math.Between(200, 400);
            hanako.y = Phaser.Math.Between(100, 200);
        }
    }

    // 衝突時の処理
    handleCollision() {
        this.displayText(100, 150, '痛い！');
    }

    // hanakoオブジェクトを生成する関数
    generateHanako() {
        let randX = Phaser.Math.Between(200, 400);
        let randY = Phaser.Math.Between(100, 200);
        this.hanakoGroup.create(randX, randY, 'hanako');
    }
}
