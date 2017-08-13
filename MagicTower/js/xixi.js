//整个游戏地图数组
var maps;
//当前关卡
var gindex=0
//存档关卡
var cungindex;
//当前游戏地图数组
var map;
//存档存的地图
var cunmap;
//界面DIV
var game;
var temp = "";
//定义游戏界面的宽和高
var gheight;
var gwidth;
//定义每个格子的宽高
var iheight;
var iwidth;
//定义英雄的坐标
var heroPoint=new Object();
//定义英雄下一个移动位置的坐标
var nextPoint=new Object();
//定义英雄下下一个移动位置的坐标
var nNextPoint=new Object();

var bk=0    //定义钥匙的初始数量
var yk=0
var rk=0

var mark=0 //定义动画跳转标志数

function loadGame(){
	initMap()
	initgame()
}


function initMap(){     //定义地图数组
	maps=[
		[
			
			[24,1,2,3,4,3,1,1,1,1,1],
			[5,5,5,5,5,5,5,5,5,5,1],
			[6,1,7,9,1,5,6,2,6,5,1],
			[2,7,1,5,1,5,6,2,6,5,1],
			[5,9,5,5,1,5,5,5,4,5,1],
			[2,10,1,5,1,9,19,3,10,5,1],
			[1,1,11,5,3,5,5,5,5,5,1],
			[5,9,5,5,7,1,1,1,1,1,1],
			[1,7,1,5,5,1,5,5,5,9,5],
			[4 ,12,2,5,2,1,1,5,2,13,11],
			[12,14,2,5,1,15,1,5,2,28,2]
		],
		[
			[5,5,5,5,5,5,5,5,5,5,5],
			[5,5,5,5,1,1,1,1,1,5,5],
			[5,1,1,1,1,5,5,5,1,5,5],
			[5,1,5,1,5,1,1,1,1,5,5],
			[5,1,5,1,240,1,270,5,1,1,5],
			[5,1,5,1,1,29,1,1,5,1,5],
			[5,1,1,5,260,1,250,1,5,1,5],
			[5,5,1,1,1,1,5,1,5,1,5],
			[5,5,1,5,5,5,1,1,1,1,5],
			[5,5,1,1,1,1,1,5,5,15,8],
			[5,5,5,5,5,5,5,5,5,5,5]
		],
		[
			[8,5,1,4,1,5,22,23,2,11,5],
			[15,5,23,5,12,5,22,23,2,11,5],
			[1,5,2,5,2,5,22,23,2,27,5],
			[1,5,2,5,2,5,5,5,5,9,5],
			[1,5,1,5,1,1,1,9,1,1,5],
			[1,5,9,5,5,9,5,5,9,5,5],
			[1,20,1,1,1,1,5,1,27,1,5],
			[1,5,9,5,5,20,5,25,5,25,5],
			[1,5,2,5,12,6,5,1,5,1,5],
			[1,5,2,5,12,6,5,1,5,1,5],
			[1,5,22,5,12,6,5,26,5,6,5]
		]
	];
	game=document.getElementById("div1");
	gheight=parseInt(game.style.height);   //定义地图一的宽和高
	gwidth=parseInt(game.style.width);
	
	iheight=gheight/11;   //定义地图中每个格子的大小
	iwidth=gwidth/11;
	
}

function initgame(){  //填充地图数组
	map=maps[gindex];
	temp="";
	for(var i=0;i<map.length;i++){
		   for(var j=0;j<map[i].length;j++){
			    	temp+="<img height='"+iheight+"' width='"+iwidth+"' src='img/"+map[i][j]+".png' id='"+j+i+"' style='background-image: url(img/1.png);'/>";
			    	if(map[i][j]==15){
			    		heroPoint.x=j;
			    		heroPoint.y=i;
			    	}
		   }
	}
	game.innerHTML=temp;
}

function go(){            //确定英雄往哪移动
	var code=window.event.keyCode;
	switch(code){
		case 38:     //向上移动
			nextPoint.x=heroPoint.x;
			nextPoint.y=heroPoint.y-1;
		break;
		
		case 39:    //向右移动
			nextPoint.x=heroPoint.x+1;
			nextPoint.y=heroPoint.y;
//		var hero1=document.getElementById(heroPoint.x+""+heroPoint.y);
//		hero1.src="img/16.png"
		
		break;
		
		case 37:     //向左移动一格
			nextPoint.x=heroPoint.x-1;
			nextPoint.y=heroPoint.y;
//		var hero2=document.getElementById(heroPoint.x+""+heroPoint.y);
//		hero2.src="img/17.png";
		
		break;
		
		case 40:    //向下移动一格
			nextPoint.x=heroPoint.x;
			nextPoint.y=heroPoint.y+1;
		break;
		
		case 87:    //w向上踢一格
			nextPoint.x=heroPoint.x;
			nextPoint.y=heroPoint.y-1;
			nNextPoint.x=heroPoint.x;
			nNextPoint.y=heroPoint.y-2;
		break;
		
		case 65:    //按a向左踢一格
			nextPoint.x=heroPoint.x-1;
			nextPoint.y=heroPoint.y;
			nNextPoint.x=heroPoint.x-2;
			nNextPoint.y=heroPoint.y;
		break;
		
		case 68:    //按d向右踢一格
			nextPoint.x=heroPoint.x+1;
			nextPoint.y=heroPoint.y;
			nNextPoint.x=heroPoint.x+2;
			nNextPoint.y=heroPoint.y;
		break;
		
		case 83:     //按s向下踢一格
			nextPoint.x=heroPoint.x;
			nextPoint.y=heroPoint.y+1;
			nNextPoint.x=heroPoint.x;
			nNextPoint.y=heroPoint.y+2;
		break;
	}
	if(code==37||code==38||code==39||code==40){
		heroMove();
	}
	else if(code==83||code==68||code==65||code==87){
		heroMove1();
	}
}

function swapMap(){
	var hero=document.getElementById(heroPoint.x+""+heroPoint.y);   //英雄此时的位置
	var jHero=document.getElementById(nextPoint.x+""+nextPoint.y);  //英雄下一步到达的位置
	
	hero.src="img/1.png";
	jHero.src="img/15.png";
		
	//更新地图
	map[heroPoint.y][heroPoint.x]=1;
	map[nextPoint.y][nextPoint.x]=15;
		
	//更新英雄的位置
	heroPoint.x=nextPoint.x;
	heroPoint.y=nextPoint.y;
}

function movie1(){
	var jHero=document.getElementById(nextPoint.x+""+nextPoint.y);  //英雄下一步到达的位置
	jHero.src="img/boom.png";
}

function movie2(){
	var jHero=document.getElementById(nextPoint.x+""+nextPoint.y);  //英雄下一步到达的位置
	jHero.src="img/1.png";
}

function movie(){
	var hero=document.getElementById(heroPoint.x+""+heroPoint.y);   //英雄此时的位置
	var jHero=document.getElementById(nextPoint.x+""+nextPoint.y);  //英雄下一步到达的位置
	
	movie1();
	var t1=setTimeout("movie2()",200);
	movie1();
	var t4=setTimeout("movie2()",200);
	movie1();
	var t6=setTimeout("movie2()",200);
	movie1();
	var t8=setTimeout("movie2()",200);    
	
}

function heroMove(){    //英雄移动的方法
	var mvalue=map[nextPoint.y][nextPoint.x];   //获取英雄下一步移动到的位置是什么地方
	var blood=Number(document.getElementById("div221").value);     //获取英雄血量
	var money=Number(document.getElementById("div251").value);     //获取金币
	var gongji=Number(document.getElementById("div231").value);    //获取攻击力
	var fangyu=Number(document.getElementById("div241").value);
	var ykey=Number(document.getElementById("div261").value);        //获取黄钥匙数量
	var bkey=Number(document.getElementById("div271").value);   //获取蓝钥匙数量
	if(mvalue==1){   //遇到地板时移动
		swapMap();
	}
	
	//打怪
	else if(mvalue==10||mvalue==13||mvalue==3||mvalue==4||mvalue==7||mvalue==18||mvalue==19||mvalue==21||mvalue==27||mvalue==240||mvalue==250||mvalue==260||mvalue==270){
		monsterMsg(mvalue);
		if(blood>(mvalue*5)){
			blood=blood-(mvalue*5);
			money=money+(mvalue*2);
            movie();
			document.getElementById("div22").innerHTML='生命：<input type="text" id="div221" value="'+blood+'"/>';
			document.getElementById("div25").innerHTML='金币：<input type="text" id="div251" value="'+money+'"/>';
			var s0=setTimeout("swapMap()",400);
			var s1=setTimeout("monsterReset()",1500);
		}
		else{
			alert("你现在的能力还不足以杀死他哦，请再去历练历练再来吧");
		}
		
	}
	
	else if(mvalue==12){   //吃蓝色大血瓶回复10滴血
		blood+=10;
		//更新血量
		document.getElementById("div22").innerHTML='生命：<input type="text" id="div221" value="'+blood+'" style="width: 100px; height: 35px; background-color: gray; color: white;"/>';
		swapMap();
	}
	
	else if(mvalue==6){   //吃红色小血瓶回复5滴血
		blood+=5;
		//更新血量
		document.getElementById("div22").innerHTML='生命：<input type="text" id="div221" value="'+blood+'" style="width: 100px; height: 35px; background-color: gray; color: white;"/>';
		swapMap();
	}
	
	else if(mvalue==2){    //得到黄钥匙
		ykey+=1;
		document.getElementById("div26").innerHTML='黄钥匙：<input type="text" id="div261" value="'+ykey+'" style="width: 70px; height: 35px; background-color: gray; color: white;"/>';
		swapMap();
	}
	
	else if(mvalue==9){   //消耗黄钥匙开门
		if(ykey>0){
			ykey-=1;
			document.getElementById("div26").innerHTML='黄钥匙：<input type="text" id="div261" value="'+ykey+'" style="width: 70px; height: 35px; background-color: gray; color: white;"/>';
			swapMap();
		}
	}
	
	else if(mvalue==11){    //得到蓝钥匙
		bkey+=1;
		document.getElementById("div27").innerHTML='蓝钥匙：<input type="text" id="div271" value="'+bkey+'" style="width: 70px; height: 35px; background-color: gray; color: white;"/>';
		swapMap();
	}
	
	else if(mvalue==20){     //用蓝钥匙开门
		if(bkey>0){
			bkey-=1;
			document.getElementById("div27").innerHTML='蓝钥匙：<input type="text" id="div271" value="'+bkey+'" style="width: 70px; height: 35px; background-color: gray; color: white;"/>';
			swapMap();
		}
	}
	
	else if(mvalue==14){    //拿到宝剑
		document.getElementById("div23").innerHTML='攻击：<input type="text" id="div231" value="39"/>';
		document.getElementById("div31").innerHTML='装备：<br/><img src="img/28.png" width="60px" height="60px" style="margin-top: 10px"/><img src="img/14.png" width="60px" height="60px" style="margin-top: 10px"/>';
		swapMap();
	}
	
	else if(mvalue==28){    //拿到盾牌可以推怪
		document.getElementById("div31").innerHTML='装备：<br/><img src="img/28.png" width="60px" height="60px" style="margin-top: 10px"/>';
		document.getElementById("div24").innerHTML='防御：<input type="text" id="div241" value="40"/>';
		swapMap();
	}
	
	else if(mvalue==22){       //获得红水晶，永久增加攻击力5点
		gongji=gongji+5;
		document.getElementById("div23").innerHTML='攻击：<input type="text" id="div231" value="'+gongji+'"/>';
		swapMap();
	}
	
	else if(mvalue==23){
		fangyu=fangyu+5;
		document.getElementById("div24").innerHTML='防御：<input type="text" id="div241" value="'+fangyu+'"/>';
		swapMap();
	}
	
	else if(mvalue==24){      //上楼
		gindex++;
		initgame();
		var xx=document.getElementById("div21");
		xx.innerHTML='<input type="text" id="div211" value="魔塔第'+(gindex+1)+'层" />';
		if(gindex==1){
			alert("请注意，这一层的怪物很强大，你可以用wasd四键将他们推到黑洞中杀死，如果这一层怪物死光，通往上层的大门将会打开");		
		}
	}
	
	else if(mvalue==8){    //下楼
		gindex--;
		initgame();var xx=document.getElementById("div21");
		xx.innerHTML='<input type="text" id="div211" value="魔塔第'+(gindex+1)+'层" />';
	}
	
}

function monsterMsg(msg){     //显示怪物信息
	document.getElementById("div321").innerHTML='<img src="img/'+msg+'.png" style="margin-top: 25px; margin-top: 5px;"/>怪物';
	document.getElementById("div322").innerHTML='血量：<input type="text" id="div3221" value="'+(msg*5)+'"/>';
	document.getElementById("div323").innerHTML='攻击：<input type="text" id="div3231" value="'+(msg*3)+'"/>';
	document.getElementById("div324").innerHTML='金币：<input type="text" id="div3241" value="'+(msg*2)+'"/>';
}

function monsterReset(){
	document.getElementById("div321").innerHTML='<img src="" style="margin-top: 25px; margin-top: 5px;"/>怪物';
	document.getElementById("div322").innerHTML='血量：<input type="text" id="div3221" value=""/>';
	document.getElementById("div323").innerHTML='攻击：<input type="text" id="div3231" value=""/>';
	document.getElementById("div324").innerHTML='金币：<input type="text" id="div3241" value=""/>';
}


function heroMove1(){     //英雄推怪时的移动方法
	var mvalue=map[nextPoint.y][nextPoint.x];
	var hero=document.getElementById(heroPoint.x+''+heroPoint.y);
	var img=document.getElementById(nextPoint.x+''+nextPoint.y);
	
	if(mvalue==1){
		swapMap();
	}
	else if(mvalue==240||mvalue==250||mvalue==260||mvalue==270){
		var mmvalue=map[nNextPoint.y][nNextPoint.x];
		if(mmvalue==1){
			var nimg=document.getElementById(nNextPoint.x+''+nNextPoint.y);
			hero.src="img/1.png";
			img.src="img/15.png";
			if(mvalue==240){
				nimg.src="img/240.png";
			}
			else if(mvalue==250){
				nimg.src="img/250.png";
			}
			else if(mvalue==260){
				nimg.src="img/260.png";
			}
			else if(mvalue==270){
				nimg.src="img/270.png";
			}
			
			//地图数组更新
			map[heroPoint.y][heroPoint.x]=1;
			map[nextPoint.y][nextPoint.x]=15;
			map[nNextPoint.y][nNextPoint.x]=mvalue;
			
			heroPoint.x=nextPoint.x
			heroPoint.y=nextPoint.y
		}
		else if(mmvalue==29){    //把怪推到黑洞里
			var nimg=document.getElementById(nNextPoint.x+''+nNextPoint.y);
			hero.src="img/1.png";
			img.src="img/15.png";
			nimg.src="img/29.png";
			
			map[heroPoint.y][heroPoint.x]=1;
			map[nextPoint.y][nextPoint.x]=15;
			map[nNextPoint.y][nNextPoint.x]=29;
			
			heroPoint.x=nextPoint.x
			heroPoint.y=nextPoint.y
			if(containMonster(gindex)){
				var door=document.getElementById(55);
				door.src="img/24.png";
				map[5][5]=24;
			}
		}
	}
	else if(mvalue==24){   
		gindex++;
		initgame();
		var xx=document.getElementById("div21");
		xx.innerHTML='<input type="text" id="div211" value="魔塔第'+(gindex+1)+'层" />';
	}
}


function containMonster(gindex){   //判断第二层地图中还有没有妖怪
	map=maps[gindex];
	for(var i=0;i<map.length;i++){
		for(var j=0;j<map[i].length;j++){
			var mmmvalue=map[i][j];
			if(mmmvalue==240||mmmvalue==250||mmmvalue==260||mmmvalue==270){
				return false;
				break;
			}
		}
	}
	return true;
}