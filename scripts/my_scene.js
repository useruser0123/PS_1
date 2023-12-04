class MyScene extends Phaser.Scene {

  constructor() {
      super({ key: 'MyScene1', active: true });
  }

  preload() {
      this.load.image('background', 'assets/background.png');
      this.load.image('taro', 'assets/taro.png');
      this.load.image('jiro', 'assets/jiro.png');
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
  }

  update(time, delta) {
      // 演習 1-4の部分（キーボード操作）をコメントアウト
      // ...

      // キーボードの入力を処理する
      this.handleKeyboardInput();

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
  }

  // キーボードの入力を処理する関数
  handleKeyboardInput() {
      // キーボードの右矢印キーを押すと taro が右に 50 動く
      if (this.input.keyboard.addKey('RIGHT').isDown) {
          this.player.setVelocityX(50);
      }
      // キーボードの左矢印キーを押すと taro が左に 50 動く
      else if (this.input.keyboard.addKey('LEFT').isDown) {
          this.player.setVelocityX(-50);
      }
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
          this.player.setVelocityX(0);
          this.player2.setVelocityX(0);
      }
  }
}
