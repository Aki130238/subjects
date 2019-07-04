class Player
  def hand
    puts "0〜2までの数字を入力してください。"
    puts '0:グー'
    puts '1:チョキ'
    puts '2:パー'
    inp = gets.chomp #getsメソッドはターミナルからキーボードで入力された値を文字列として取得する
    inp = inp.tr('０-９ａ-ｚＡ-Ｚ','0-9a-zA-Z') #大文字から小文字に変換
    if inp == "0" || inp == "1" || inp == "2" #文字列で入力されているため数字の１ではなく文字列の"1"として比較する
      return inp.to_i #trueならinpの値を整数に置き換えて処理を抜ける
    else #falseなら以下の処理
      puts "やりなおし"
      return hand #自身のhand関数を呼び出して、処理を続行する
    end
  end
end

class Enemy
  def hand
    random = Random.new() #乱数の種を省略
    return random.rand(0..2) #0〜2までの乱数
  end
end

class Janken
  def pon(player_hand, enemy_hand)
    enemypattern = ["グー","チョキ","パー"] #相手の手を配列に用意する
    enemy = enemypattern[enemy_hand] #ランダムで生成された相手の手からインデックスを参照して配列から取り出す
    player_hand = player_hand.to_i #to_iメソッドは文字列を10進数の表現と見なして整数に変換する。inp変数に代入された入力値を整数型に変換する。
    if player_hand == 0 || player_hand == 1 || player_hand == 2 #複数条件で分岐
      if((player_hand - enemy_hand) + 3) % 3 == 2
        puts "相手は#{enemy}を出しました。あなたの勝利です。"
      elsif((player_hand - enemy_hand) + 3) % 3 == 1 #負け判定
        puts "相手は#{enemy}を出しました。あなたの負けです。"
      elsif((player_hand - enemy_hand) + 3) % 3 == 0 #分け判定
        puts "相手は#{enemy}を出しました。あいこです。もう一度じゃんけんしてください。"
        player = Player.new #スコープ外のクラスをスコープ内で作成する
        enemy = Enemy.new #スコープ外のクラスをスコープ内で作成する
        return pon(player.hand, enemy.hand) #スコープ外のクラスをスコープ内で呼び出して同じ処理を続けられる。
      end
    end
  end
end

player = Player.new
enemy = Enemy.new
janken = Janken.new

# 下記の記述で、ジャンケンメソッドが起動される
janken.pon(player.hand, enemy.hand)
