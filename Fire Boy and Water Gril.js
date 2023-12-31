/*

SWS3012 Structure and Interpretation of Computer Programs

Course project: Fire Boy and Water Girl

Project team members: CHANG MINGYUE  MA JIALU  TANG AIJIA  WU YIJING

Resources used:


*/

// 2D game : Fire Boy and Water Girl
//
// Fire Boy:A and D: Walk left and right
//          W: Jump
//Water Girl:J and L:Walk left and right
//           I: Jump



import {init_unity_academy_3d, init_unity_academy_2d, set_start, set_update,
instantiate, delta_time, instantiate_sprite, same_gameobject, destroy,
translate_world,get_key_down, get_key, get_key_up, get_position, copy_position,
set_position, get_rotation_euler, set_rotation_euler, rotate_world,
get_scale, set_scale, play_animator_state, add_impulse_force,
apply_rigidbody, get_angular_velocity, get_mass, get_velocity,
set_angular_velocity, set_mass, set_use_gravity ,set_velocity,
on_collision_enter, on_collision_stay, on_collision_exit,point_distance,
get_main_camera_following_target,remove_collider_components,gui_label,gui_button,
vector3,get_x,get_y,get_z
} from "unity_academy";

import {trombone,piano,play_concurrently,consecutively,simultaneously} from "sound";

init_unity_academy_2d();

//bgm

const r21=piano(75,0.5);
const r22=piano(70,0.5);
const r0=trombone(20,1);
const r1=piano(75,2);
const r2=piano(54,1);
const r3=piano(53,1);
const r4=piano(52,1);
const r5=piano(51,1);
const r6=piano(50,1);
const r7=piano(49,1);
//play_concurrently(simultaneously(list(r2,r3,r4,r5,r6,r7)));   fall
//play_concurrently(r1);   lift
//play_concurrently(r0);    door
//play_concurrently(r21);    jump


//begin
let winboy=false;
let wingirl=false;

let begin=instantiate_sprite('https://raw.githubusercontent.com/xmkdgdz/2d-game/master/images/begin.png');
let start_begin=(gameObject) => {set_position(gameObject, 0, 0, -10);set_scale(gameObject,1.2,1,0);remove_collider_components(gameObject);};
set_start(begin,start_begin);

function update_begin(gameObject){
    gui_button("play",800,450,50,()=>destroy(gameObject));
}
set_update(begin,update_begin);

let instruction=instantiate_sprite('https://raw.githubusercontent.com/xmkdgdz/2d-game/master/images/instruction2.png');
let start_instruction=(gameObject) => {set_position(gameObject, 0, 0, -8);set_scale(gameObject,1.2,1,0);remove_collider_components(gameObject);};
set_start(instruction,start_instruction);
function update_instruction(gameObject){
    if(get_key("F")){
        destroy(gameObject);
    }
}
set_update(instruction,update_instruction);

let boydoor=instantiate_sprite('https://raw.githubusercontent.com/xmkdgdz/2d-game/master/images/boydoor.png');
let start_boydoor=(gameObject) => {set_position(gameObject, 6.5, 2, 1);set_scale(gameObject,0.3,0.3,0);remove_collider_components(gameObject);};
set_start(boydoor,start_boydoor);

let girldoor=instantiate_sprite('https://raw.githubusercontent.com/xmkdgdz/2d-game/master/images/girldoor.png');
let start_girldoor=(gameObject) => {set_position(gameObject, 8.5, 2, 1);set_scale(gameObject,0.3,0.3,0);remove_collider_components(gameObject);};
set_start(girldoor,start_girldoor);

let end=instantiate_sprite('https://raw.githubusercontent.com/xmkdgdz/2d-game/master/images/end.png');
set_position(end,0,0,10);
remove_collider_components(end);
        
function update_end(gameObject){
    if(wingirl&&winboy){
        set_position(end, 0, 0, -8);
        set_scale(end,1.2,1,0);
        gui_button("replay",800,450,50,replay);
    }
}

function replay(){
    winboy=false;
    wingirl=false;
    //boy = instantiate_sprite('https://raw.githubusercontent.com/xmkdgdz/2d-game/main/images/boy.png');
    //girl = instantiate_sprite('https://raw.githubusercontent.com/xmkdgdz/2d-game/main/images/girl.png'); 
    
    destroy(boydoor);
    boydoor=instantiate_sprite('https://raw.githubusercontent.com/xmkdgdz/2d-game/master/images/boydoor.png');
    //start_boydoor=(gameObject) => {set_position(gameObject, 6.5, 2, 1);set_scale(gameObject,0.3,0.3,0);remove_collider_components(gameObject);};
    set_start(boydoor,start_boydoor);

    
    destroy(girldoor);
    girldoor=instantiate_sprite('https://raw.githubusercontent.com/xmkdgdz/2d-game/master/images/girldoor.png');
    //start_girldoor=(gameObject) => {set_position(gameObject, 8.5, 2, 1);set_scale(gameObject,0.3,0.3,0);remove_collider_components(gameObject);};
    set_start(girldoor,start_girldoor);
    
    // set_start(boy,start_player);
    // set_start(girl,start_player);
    set_position(boy,  -9, -4, 0);
    set_position(girl,  -9, -4, 0);

    begin=instantiate_sprite('https://raw.githubusercontent.com/xmkdgdz/2d-game/master/images/begin.png');
    //let start_begin=(gameObject) => {set_position(gameObject, 0, 0, -10);set_scale(gameObject,1.2,1,0);remove_collider_components(gameObject);};
    set_start(begin,start_begin);
    set_update(begin,update_begin);
    
    instruction=instantiate_sprite('https://raw.githubusercontent.com/xmkdgdz/2d-game/master/images/instruction2.png');
    //let start_instruction=(gameObject) => {set_position(gameObject, 0, 0, -8);set_scale(gameObject,1.2,1,0);remove_collider_components(gameObject);};
    set_start(instruction,start_instruction);
    set_update(instruction,update_instruction);
    
    
    set_position(end,0,0,10);
    set_update(end,update_end);
}


//MAP

//start basic map
const background=instantiate_sprite('https://raw.githubusercontent.com/xmkdgdz/2d-game/master/images/background.jpg');
const ground1=instantiate_sprite('https://raw.githubusercontent.com/xmkdgdz/2d-game/main/images/ground1.png');
const ground2=instantiate_sprite('https://raw.githubusercontent.com/xmkdgdz/2d-game/main/images/ground1.png');
//const ground3=instantiate_sprite('https://raw.githubusercontent.com/xmkdgdz/2d-game/main/images/ground2.png');
//const ground4=instantiate_sprite('https://raw.githubusercontent.com/xmkdgdz/2d-game/main/images/ground2.png');

function start_background(gameObject) {
    remove_collider_components(gameObject);
    set_position(gameObject, 0, 0, 3);
    set_scale(gameObject,2,2,0);
}

const start_ground1 = (gameObject) => {set_position(gameObject, 0, -5, 0);set_scale(gameObject,5,1,0);};
const start_ground2 = (gameObject) => {set_position(gameObject, 0, 5, 0);set_scale(gameObject,5,1,0);};
//const start_ground3 = (gameObject) => {set_position(gameObject, -10, 0, 0);set_scale(gameObject,1,2,0);};
//const start_ground4 = (gameObject) => {set_position(gameObject, 10, 0, 0);set_scale(gameObject,1,2,0);};

set_start(background,start_background);
set_start(ground1,start_ground1);
set_start(ground2,start_ground2);
//set_start(ground3,start_ground3);
//set_start(ground4,start_ground4);

//start special map
const wall1=instantiate_sprite('https://raw.githubusercontent.com/xmkdgdz/2d-game/master/images/wall.png');
const start_wall1=(gameObject) => {set_position(gameObject, 6, -3.7, 0);set_scale(gameObject,2,1,0);};
set_start(wall1,start_wall1);

const bluewater=instantiate_sprite('https://raw.githubusercontent.com/xmkdgdz/2d-game/master/images/bluewater2.png');
const start_bluewater=(gameObject) => {set_position(gameObject, 0, -2.1, -1);set_scale(gameObject,0.4,1,0);};
set_start(bluewater,start_bluewater);

const redwater=instantiate_sprite('https://raw.githubusercontent.com/xmkdgdz/2d-game/master/images/redwater.png');
const start_redwater=(gameObject) => {set_position(gameObject, -4, -2.1, -1);set_scale(gameObject,0.4,1,0);};
set_start(redwater,start_redwater);

const wall6=instantiate_sprite('https://raw.githubusercontent.com/xmkdgdz/2d-game/master/images/wall.png');
const start_wall6=(gameObject) => {set_position(gameObject, -3, -2.3, 0);set_scale(gameObject,3,1,0);};
set_start(wall6,start_wall6);


const wall2=instantiate_sprite('https://raw.githubusercontent.com/xmkdgdz/2d-game/master/images/wall.png');
const start_wall2=(gameObject) => {set_position(gameObject, -8.5, -1.8, 0);set_scale(gameObject,0.5,1,0);};
set_start(wall2,start_wall2);


function walls(){
    let w=[];
    for(let i=0;i<4;i=i+1){
        w[i]=instantiate_sprite('https://raw.githubusercontent.com/xmkdgdz/2d-game/master/images/wall.png');
        set_position(w[i], -6+i*3, 2, 0);
        set_scale(w[i],0.5,1,0);
    }
    
}
walls();

const wall5=instantiate_sprite('https://raw.githubusercontent.com/xmkdgdz/2d-game/master/images/wall.png');
const start_wall5=(gameObject) => {set_position(gameObject, 7.4, 1.2, 0);set_scale(gameObject,1.5,1,0);};
set_start(wall5,start_wall5);





//PLAYER


let boy = instantiate_sprite('https://raw.githubusercontent.com/xmkdgdz/2d-game/main/images/boy.png');
let girl = instantiate_sprite('https://raw.githubusercontent.com/xmkdgdz/2d-game/main/images/girl.png'); 
//start player
function start_player(gameObject){
    //开始
    set_position(gameObject,  -9, -4, 0);
    //终点
    //set_position(gameObject,  6, 3, 0);
    //电梯
    //set_position(gameObject,  -6, 0, 0);
    set_scale(gameObject, 0.5, 0.5, 1);
    apply_rigidbody(gameObject);
}



//player move
function update_boy(gameObject){
    
    const moveSpeed = 3;
    
    // Player: move and jump
    if(get_key("A")){
        translate_world(gameObject, -delta_time() * moveSpeed, 0, 0);
        // const N=get_position(gameObject);
        // destroy(gameObject);
        // gameObject=instantiate_sprite('https://raw.githubusercontent.com/xmkdgdz/2d-game/master/images/boyleft.png');
        // set_position(gameObject,N[0],N[1],N[2]);
        // set_scale(gameObject, 0.5, 0.5, 1);
        
    
    }
    if(get_key("D")){
        // const N=get_position(gameObject);
        // destroy(gameObject);
        // set_position(gameObject,N[0],N[1],N[2]);
        // let gameObject=instantiate_sprite('https://raw.githubusercontent.com/xmkdgdz/2d-game/master/images/boyleft.png');
        //set_scale(gameObject, 0.5, 0.5, 1);
        translate_world(gameObject, delta_time() * moveSpeed, 0, 0);
        
    }
    if(get_key("W") && math_abs(get_velocity(gameObject)[1]) <= 0.05){
        add_impulse_force(gameObject, 0, 5, 0);
        play_concurrently(r22);
    }

    set_rotation_euler(gameObject, 0, 0, 0);
    // Check if boy is close to boydoor
    const boyPosition = get_position(gameObject);
    const boyv=vector3(boyPosition[0],boyPosition[1],boyPosition[2]);
    const boydoorPosition = get_position(boydoor);
    const boydoorv=vector3(boydoorPosition[0],boydoorPosition[1],boydoorPosition[2]);
    let distance = point_distance(boyv,boydoorv);
    
    if(distance < 1.2){ 
        play_concurrently(r0);
       set_position(boy,-9,-4,10);
       destroy(boydoor);
        boydoor = instantiate_sprite('https://raw.githubusercontent.com/xmkdgdz/2d-game/master/images/opendoor.png');
         //start_boydoor=(gameObject) => {set_position(gameObject, 6.5, 2, 0);set_scale(gameObject,0.3,0.3,0);remove_collider_components(gameObject);};
        set_start(boydoor, start_boydoor);
        winboy=true;
    }
}

function update_girl(gameObject){
    
    const moveSpeed = 3;
    
    // Player: move and jump
    if(get_key("J")){
        translate_world(gameObject, -delta_time() * moveSpeed, 0, 0);
    }
    if(get_key("L")){
        translate_world(gameObject, delta_time() * moveSpeed, 0, 0);
    }
    if(get_key("I") && math_abs(get_velocity(gameObject)[1]) <= 0.05){
        add_impulse_force(gameObject, 0, 5, 0);
        play_concurrently(r21);
    }

    set_rotation_euler(gameObject, 0, 0, 0);
    // Check if girl is close to girldoor
    const girlPosition = get_position(gameObject);
    const girlv=vector3(girlPosition[0],girlPosition[1],girlPosition[2]);
    const girldoorPosition = get_position(girldoor);
    const girldoorv=vector3(girldoorPosition[0],girldoorPosition[1],girldoorPosition[2]);
    let distance = point_distance(girlv,girldoorv);
    
    if(distance < 1.2){ 
        play_concurrently(r0);
        set_position(girl,-9,-4,10);
        destroy(girldoor);
        girldoor = instantiate_sprite('https://raw.githubusercontent.com/xmkdgdz/2d-game/master/images/opendoor.png');
        //start_girldoor=(gameObject) => {set_position(gameObject, 8.5, 2, 0);set_scale(gameObject,0.3,0.3,0);remove_collider_components(gameObject);};
        set_start(girldoor, start_girldoor);
        wingirl=true;
    }
}



set_start(boy,start_player);
set_start(girl,start_player);
set_update(boy,update_boy);
set_update(girl,update_girl);



//INTERACTION
function red_touch(self,other){
    if(same_gameobject(other, redwater)){
        play_concurrently(simultaneously(list(r2,r3,r4,r5,r6,r7)));
        set_position(self, -9, -4, 0);
    }
}

function blue_touch(self,other){
    if(same_gameobject(other, bluewater)){
        play_concurrently(simultaneously(list(r2,r3,r4,r5,r6,r7)));
        set_position(self, -9, -4, 0);
    }
}
on_collision_enter(girl,red_touch);
on_collision_enter(boy,blue_touch);

function wall_touch(self,other){
    let wall2Position=get_position(wall2);
    if(same_gameobject(other,wall2)&&wall2Position[1]<2){
        //play_concurrently(r1);
        const moveSpeed = 3;
        translate_world(wall2, 0, delta_time() * moveSpeed, 0);
       set_rotation_euler(wall2, 0, 0, 0);
    }
}

on_collision_stay(boy,wall_touch);
on_collision_stay(girl,wall_touch);

function update_wall(gameObject){
    let wall2Position=get_position(wall2);
    if(wall2Position[1]>-1.8){
        const moveSpeed = -1;
        translate_world(wall2, 0, delta_time() * moveSpeed, 0);
        set_rotation_euler(wall2, 0, 0, 0);
    }
}
set_update(wall2,update_wall);

set_update(end,update_end);

