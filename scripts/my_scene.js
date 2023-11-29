
// MyScene1クラス
// 他のJSファイルから呼び出された場合はシーンを返す
class MyScene extends Phaser.Scene{

    // シーンの事前読み込み処理
    preload() {
         // 画像の読み込み(使用する時の名前, パス)
        this.load.image('background', 'assets/background.png');
        this.load.image('taro', 'assets/taro.png');
    }

    // シーン初期化処理
    create() {
         // 単体画像をシーンに追加(X座標,Y座標,画像名)
        this.add.image(D_WIDTH/2, D_HEIGHT/2, 'background');
        const player = this.physics.add.sprite(500, 350, 'taro');
        this.player = player
        this.player.angle = 0;
    }
    
  // 毎フレーム実行される繰り返し処理
    update(time, delta) {
        // プレイヤーの向きフラグを変更
        if (this.player.x >= D_WIDTH - 100) this.player_direction = -1;
        if (this.player.x <= 450) this.player_direction = 1;
        // プレイヤーの移動
        // +X方向の移動フラグならプレイヤーを右に移動
        if (this.player_direction == 1) {
            this.player.setVelocityX(100);
            this.player.setVelocityY(-100);
        // -X方向の移動フラグならプレイヤーを左に移動
        } else {
          this.player.setVelocityX(-100);
          this.player.setVelocityY(100);
        }
       // if (this.player.y >= D_WIDTH - 400) this.player_direction3 = -1;
       // if (this.player.y <= 30) this.player_direction3 = 1;
       // if (this.player.x >= D_WIDTH - 100) this.player_direction3 = -1;
       // if (this.player.x <= 0) this.player_direction3 = 1;
       // // プレイヤーの移動
       //     this.player.y -= 5;// 横方向へ移動を設定
       //     this.player.x += 5;// 横方向へ移動を設定
       // this.player.angle += 5;
       // this.player.setAngle( this.player.angle );
  }
}