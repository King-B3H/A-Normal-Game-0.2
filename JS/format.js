function format(variable){ //formats a variable, then also adjuts the suffix based on notation style from
  var standNotation = [
    " Thousand",
    " Million",
    " Billion",
    " Trillion",
    " Quadrillion",
    " Quintillion",
    " Sextillion",
    " Septillion",
    " Octillion",
    " Nonillion",
    " Decillion",
    " Undecillion",
    " Duodecillion",
    " Tredecillion",
    " Quattuordecillion",
    " Quindecillion",
    " Sedecillion",
    " Sepdecillion",
    " Octodecillion",
    " Novendecillion",
    " Vigintillion",
    " Unvigintillion",
    " Duovigintillion",
    " Tresvigintillion",
    " Quattuorvigintillion",
    " Quinvigintillion",
    " Sesvigintillion",
    " Septemvigintillion",
    " Octovigintillion",
    " Novemvigintillion",
    " Trigintillion",
    " Untrigintillion",
    " Duotrigintillion",
    " Trestrigintillion",
    " Quattuortrigintillion",
    " Quintrigintillion",
    " Sestrigintillion",
    " Septentrigintillion",
    " Octotrigintillion",
    " Noventrigintillion",
    " Quadragintillion",
    " Unquadragintillion",
    " Duoquadragintillion",
    " Tresquadragintillion",
    " Quattuorquadragintillion",
    " Quinquadragintillion",
    " Sesquadragintillion",
    " Septenquadragintillion",
    " Octoquadragintillion",
    " Novenquadragintillion",
    " Quinquagintillion",
    " Unquinquagintillion",
    " Duoquinquagintillion",
    " Tresquinquagintillion",
    " Quattuorquinquagintillion",
    " Quinquinquagintillion",
    " Sesquinquagintillion",
    " Septenquinquagintillion",
    " Octoquinquagintillion",
    " Novenquinquagintillion",
    " Sexagintillion",
    " Unsexagintillion",
    " Duosexagintillion",
    " Tressexagintillion",
    " Quattuorsexagintillion",
    " Quinsexagintillion",
    " Sessexagintillion",
    " Septensexagintillion",
    " Octosexagintillion",
    " Novensexagintillion",
    " Septuagintillion",
    " Unseptuagintillion",
    " Duoseptuagintillion",
    " Tresseptuagintillion",
    " Quattuorseptuagintillion",
    " Quinseptuagintillion",
    " Sesseptuagintillion",
    " Septenseptuagintillion",
    " Octoseptuagintillion",
    " Novenseptuagintillion",
    " Octogintillion",
    " Unoctogintillion",
    " Duooctogintillion",
    " Tresoctogintillion",
    " Quattuoroctogintillion",
    " Quinoctogintillion",
    " Sesoctogintillion",
    " Septenoctogintillion",
    " Octooctogintillion",
    " Novenoctogintillion",
    " Nonagintillion",
    " Unnonagintillion",
    " Duononagintillion",
    " Tresnonagintillion",
    " Quattuornonagintillion",
    " Quinnonagintillion",
    " Sesnonagintillion",
    " Septennonagintillion",
    " Octononagintillion",
    " Novennonagintillion",
    " Centillion",
  ]
  var abbrevNotation = [
    " K",
    " M",
    " B",
    " T",
    " q",
    " Q",
    " s",
    " S",
    " O",
    " N",
    " D", //e33
    " UD", //e36
    " DD", //e39
    " TD",
    " qD",
    " QD",
    " sD",
    " SD",
    " OD",
    " ND",
    " VG",
    " UVG",
    " DVG",
    " TVG",
    " qVG",
    " QVG",
    " sVG",
    " SVG",
    " OVG",
    " NVG",
    " TG",
    " UTG",
    " DTG",
    " TTG",
    " qTG",
    " QTG",
    " sTG",
    " STG",
    " OTG",
    " NTG",
    " qG",
    " UqG",
    " DqG",
    " TqG",
    " qqG",
    " QqG",
    " sqG",
    " SqG",
    " OqG",
    " NqG",
    " QG",
    " UQG",
    " DQG",
    " TQG",
    " qQG",
    " QQG",
    " sQG",
    " SQG",
    " OQG",
    " NQG",
    " sG",
    " UsG",
    " DsG",
    " TsG",
    " qsG",
    " QsG",
    " ssG",
    " SsG",
    " OsG",
    " NsG",
    " SG",
    " USG",
    " DSG",
    " TSG",
    " qSG",
    " QSG",
    " sSG",
    " SSG",
    " OSG",
    " NSG",
    " OG",
    " UOG",
    " DOG",
    " TOG",
    " qOG",
    " QOG",
    " sOG",
    " SOG",
    " OOG",
    " NOG",
    " NG",
    " UNG",
    " DNG",
    " TNG",
    " qNG",
    " QNG",
    " sNG",
    " SNG",
    " ONG",
    " NNG",
    " Ce",
  ]

  var varLen = Math.floor(Math.log10(variable))

  var endNotation1 = abbrevNotation[Math.floor(varLen/3)-1]

  var endNotation2 = abbrevNotation[Math.round(varLen/3)-2]

  if(variable < 1000){
    return variable
  }
  
  if(variable >= 1000 && variable < 1e21){
    if(varLen%3 == 0){
      variable = variable.toString().substring(0,1) + "." + variable.toString().substring(1,2) + endNotation1
      return variable
    }
    
    if(varLen%3 == 1){
      variable = variable.toString().substring(0,2) + "." + variable.toString().substring(2,3) + endNotation1
      return variable
    }
    
    if(varLen%3 == 2){
      variable = variable.toString().substring(0,3) + "." + variable.toString().substring(3,4) + endNotation2
      return variable
    }
  }
  if(variable >= 1e21){
    if(variable.toString().includes(".") == true){
      if((variable.toString().length)-5 == 2){ //if value would a number like 5.4e51 then it won't break and display wrong
        if(varLen%3 == 0){
          variable = variable.toString().substring(0,1) +  "." + variable.toString().substring(2, 3) + endNotation1
          return variable
        }
        //1.523e9
        if(varLen%3 == 1){
          variable = variable.toString().substring(0,1) + variable.toString().substring(2,3) + endNotation1
          return variable
        }
        
        if(varLen%3 == 2){
          variable = variable.toString().substring(0,1) + variable.toString().substring(2,3) + "0" + endNotation2
          return variable
        }
      }else{
      if(varLen%3 == 0){
        variable = variable.toString().substring(0,1) +  "." + variable.toString().substring(2, 3) + endNotation1
        return variable
      }
      //1.523e9
      if(varLen%3 == 1){
        variable = variable.toString().substring(0,1) + variable.toString().substring(2,3) + "." + variable.toString().substring(3, 4) + endNotation1
        return variable
      }
      
      if(varLen%3 == 2){
        variable = variable.toString().substring(0,1) + variable.toString().substring(2,4) + "." + variable.toString().substring(4, Math.min(6,variable.toString().length-4)) + endNotation2
        return variable
      }
    }
    }

    if(variable.toString().includes(".") == false){
      if(varLen%3 == 0){
        variable = variable.toString().substring(0,1) + endNotation1
        return variable
      }
      //1.523e9
      if(varLen%3 == 1){
        variable = variable.toString().substring(0,1) +  "0" + endNotation1
        return variable
      }
      
      if(varLen%3 == 2){
        variable = variable.toString().substring(0,1) +  "00" + endNotation1
        return variable
      }
    }
    
  }

}

//PLEASE RESCRIPT THIS FOR THE LOVE OF GOD AT SOME POINT