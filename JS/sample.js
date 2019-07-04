
$(document).ready(function(){
  function score_indicate(){
    // このような記述をすることで、subject_pointsという変数の中に
    // [国語の点数,英語の点数,数学の点数,理科の点数,社会の点数]という配列を作成できる。
    let subject_points = [Number($('#national_language').val()), //HTML側id#national_languageの値をNumberオブジェクトで取得
                          Number($('#english').val()), //HTML側id#englishの値をNumberオブジェクトで取得
                          Number($('#mathematics').val()), //HTML側id#mathematicsの値をNumberオブジェクトで取得
                          Number($('#science').val()), //HTML側id#scienceの値をNumberオブジェクトで取得
                          Number($('#society').val()) //HTML側id#societyの値をNumberオブジェクトで取得
                          ];

    // htmlのlavelidを　記述をすることで、「合計点：」となっている右の部分に合計点が出力される
    let sum = subject_points[0]; //subject_points配列のインデックス０を代入
    sum = sum + subject_points[1]; //subject_points配列のインデックス１を代入
    sum = sum + subject_points[2]; //subject_points配列のインデックス２を代入
    sum = sum + subject_points[3]; //subject_points配列のインデックス３を代入
    sum = sum + subject_points[4]; //subject_points配列のインデックス４を代入
    $("#sum_indicate").text(sum);

    // ここに、上記を参考にして平均点を出力する処理を書き込む
    let avg = (sum / subject_points.length); // 合計sumを教科の数subject_points.lengthで割った値を代入
    $("#avarage_indicate").text(avg); // HTML側ラベル要素id#avarage_indicateにtextオブジェクトでavg変数を代入
    return avg; // avgに代入した平均値を戻り値としてavgに返す。これにより別の関数からscore_indicate()で呼び出された関数の値を取得できる
  };

  function get_achievement(){ //スコア判定関数
    // ここに、ランクの値の文字列（平均点が80点以上なら"A"、60点以上なら"B"、40点以上なら"C"、それ以下なら"D"）を出力する処理を書き込む
    let score = score_indicate(); //score変数にscore_indicate関数の戻り値return avgの値を代入
    if (score >= 80) { //scoreが８０点以上なら
      return "A"; //A判定でif文から抜ける
    }
    else if (score >= 60) { //scoreが６０点以上なら
      return "B"; //B判定でif文から抜ける
    }
    else if (score >= 40) { //scoreが４０点以上なら
      return "C"; //C判定でif文から抜ける
    } else { //scoreがそれ以外の点数なら
      return "D"; //D判定でif文から抜ける
    }
  };

  function get_pass_or_failure(){ //成績判定関数
    // ここに、全ての教科が60点以上なら"合格"の文字列、一つでも60点未満の教科があったら"不合格"の文字列を出す処理を書き込む
    let subject_points = [Number($('#national_language').val()),
                          Number($('#english').val()),
                          Number($('#mathematics').val()),
                          Number($('#science').val()),
                          Number($('#society').val())
                          ];
    let judge = "合格"; //合格をjudge変数に代入
    for(let i=0; i<subject_points.length; i++){ //教科の数だけ繰り返し処理
      if (subject_points[i] < 60) { //教科の点数が６０点未満の場合
        judge = "不合格"; //不合格をjudge変数に代入
        return judge; //リターンで戻り値judgeを返して処理から抜ける
      }
    }
    return judge; //リターンで戻り値judgeを返して処理から抜ける
  };

  function judgement(){ //最終ジャッジ関数
    let achievement = get_achievement(); //スコア判定関数get_achievementの戻り値をachievement変数に代入
    let judgement = get_pass_or_failure(); //成績判定関数get_pass_or_failureの戻り値をjudgement変数に代入
    // ここに、「最終ジャッジ」のボタンを押したら「あなたの成績はAです。合格です」といった内容を出力する処理を書き込む
    // 下記の記述をすることで、「最終ジャッジ」のボタンを押すと「あなたの成績は（ここに「ランク」の値を入れる）です。（ここに「判定」の値を入れる）です」という文字の入った水色のフキダシが出力される処理が実装される。
    $('#declaration').append(`<label id="alert-indicate" class="alert alert-info">あなたの成績は${achievement}です。${judgement}です</label>`);
  }; //JQueryのappendメソッドで要素を追加する。Template literalで要素内のテキストを動的に出力する。

  $('#national_language, #english, #mathematics, #science, #society').change(function() {
    score_indicate(); //changeメソッドでHTML側idに変更があれば関数を実行する
  });

  $('#btn-evaluation').click(function() { //clickメソッドでHTML側id#btn-evaluationがクリックされたら関数を実行する
    let lank = get_achievement(); // スコア判定関数を　lank 関数に代入
    $("#evaluation").text(lank); // HTML側ラベル要素id#evaluationに.textメソッドでlank変数に代入されている値を追加
  });

  $('#btn-judge').click(function() { //clickメソッドでHTML側id#btn-judgeがクリックされたら関数を実行する
    let jdg = get_pass_or_failure(); // 合否判定関数を　jdg 関数に代入
    $("#judge").text(jdg); // HTML側ラベル要素id#judgeに.textメソッドでjdg変数に代入されている値を追加
  });

  $('#btn-declaration').click(function() {  //clickメソッドでHTML側id#btn-evaluationがクリックされたら関数を実行する
    $('#alert-indicate').remove(); //対象要素を削除
    judgement(); //最終ジャッジ関数を実行。追加されている要素を削除することで重複を防ぐ
  });
});
