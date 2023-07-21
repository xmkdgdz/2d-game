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
on_collision_enter, on_collision_stay, on_collision_exit,
get_main_camera_following_target,remove_collider_components,gui_label } from "unity_academy";

init_unity_academy_2d();


//MAP

//start basic map
const background=instantiate_sprite('https://raw.githubusercontent.com/xmkdgdz/2d-game/main/images/background.png');
const ground1=instantiate_sprite('https://raw.githubusercontent.com/xmkdgdz/2d-game/main/images/ground1.png');
const ground2=instantiate_sprite('https://raw.githubusercontent.com/xmkdgdz/2d-game/main/images/ground1.png');
const ground3=instantiate_sprite('https://raw.githubusercontent.com/xmkdgdz/2d-game/main/images/ground2.png');
const ground4=instantiate_sprite('https://raw.githubusercontent.com/xmkdgdz/2d-game/main/images/ground2.png');

function start_background(gameObject) {
    remove_collider_components(gameObject);
    set_position(gameObject, 0, 0, 3);
    set_scale(gameObject,2,2,0);
}

const start_ground1 = (gameObject) => {set_position(gameObject, 0, -5, 0);set_scale(gameObject,2,1,0);};
const start_ground2 = (gameObject) => {set_position(gameObject, 0, 5, 0);set_scale(gameObject,2,1,0);};
const start_ground3 = (gameObject) => {set_position(gameObject, -10, 0, 0);set_scale(gameObject,1,2,0);};
const start_ground4 = (gameObject) => {set_position(gameObject, 10, 0, 0);set_scale(gameObject,1,2,0);};

set_start(background,start_background);
set_start(ground1,start_ground1);
set_start(ground2,start_ground2);
set_start(ground3,start_ground3);
set_start(ground4,start_ground4);

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
const start_wall2=(gameObject) => {set_position(gameObject, -8, -1.8, 0);set_scale(gameObject,0.5,3,0);};
set_start(wall2,start_wall2);


function walls(){
    let w=[];
    for(let i=0;i<4;i=i+1){
        w[i]=instantiate_sprite('https://raw.githubusercontent.com/xmkdgdz/2d-game/master/images/wall.png');
        set_position(w[i], -6+i*3, 0, 0);
        set_scale(w[i],0.5,1,0);
    }
    
}
walls();

const wall5=instantiate_sprite('https://raw.githubusercontent.com/xmkdgdz/2d-game/master/images/wall.png');
const start_wall5=(gameObject) => {set_position(gameObject, 7.4, 1.2, 0);set_scale(gameObject,1.5,1,0);};
set_start(wall5,start_wall5);

let boydoor=instantiate_sprite('https://raw.githubusercontent.com/xmkdgdz/2d-game/master/images/boydoor.png');
let start_boydoor=(gameObject) => {set_position(gameObject, 6.5, 2, 1);set_scale(gameObject,0.3,0.3,0);remove_collider_components(gameObject);};
set_start(boydoor,start_boydoor);

let girldoor=instantiate_sprite('https://raw.githubusercontent.com/xmkdgdz/2d-game/master/images/girldoor.png');
let start_girldoor=(gameObject) => {set_position(gameObject, 8.5, 2, 1);set_scale(gameObject,0.3,0.3,0);remove_collider_components(gameObject);};
set_start(girldoor,start_girldoor);



//PLAYER


let boy = instantiate_sprite('https://raw.githubusercontent.com/xmkdgdz/2d-game/main/images/boy.png');
let girl = instantiate_sprite('https://raw.githubusercontent.com/xmkdgdz/2d-game/main/images/girl.png'); 
//start player
function start_player(gameObject){
    set_position(gameObject,  -9, -4, 0);
    //set_position(gameObject,  7, 3, 0);
    set_scale(gameObject, 0.5, 0.5, 1);
    apply_rigidbody(gameObject);
}
let winboy=false;
let wingirl=false;
//player move
function update_boy(gameObject){
    
    const moveSpeed = 3;
    
    // Player: move and jump
    if(get_key("A")){
        // const N=get_position(gameObject);
        // destroy(gameObject);
        // let gameObject=instantiate_sprite('https://raw.githubusercontent.com/xmkdgdz/2d-game/master/images/boyleft.png');
        // set_position(gameObject,N[0],N[1],N[2]);
        set_scale(gameObject, 0.5, 0.5, 1);
        translate_world(gameObject, -delta_time() * moveSpeed, 0, 0);
    
    }
    if(get_key("D")){
        // const N=get_position(gameObject);
        // destroy(gameObject);
        // set_position(gameObject,N[0],N[1],N[2]);
        // let gameObject=instantiate_sprite('https://raw.githubusercontent.com/xmkdgdz/2d-game/master/images/boyleft.png');
        set_scale(gameObject, 0.5, 0.5, 1);
        translate_world(gameObject, delta_time() * moveSpeed, 0, 0);
        
    }
    if(get_key("W") && math_abs(get_velocity(gameObject)[1]) <= 0.05){
        add_impulse_force(gameObject, 0, 5, 0);
    }

    set_rotation_euler(gameObject, 0, 0, 0);
    // Check if boy is close to boydoor
    const boyPosition = get_position(gameObject);
    const boydoorPosition = get_position(boydoor);
    let distance = math_abs(boyPosition[0] - boydoorPosition[0]);
    
    if(distance <= 0.02){ 
       //set_position(gameObject, -9, -4, 0); 
       destroy(boy);
         boydoor = instantiate_sprite('https://raw.githubusercontent.com/xmkdgdz/2d-game/master/images/opendoor.png');
    set_start(boydoor, start_boydoor);
    winboy=true;
    }
    
    gui_label('You win',0,0,5);
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
    }

    set_rotation_euler(gameObject, 0, 0, 0);
    // Check if girl is close to boydoor
    const girlPosition = get_position(gameObject);
    const girldoorPosition = get_position(girldoor);
    let distance = math_abs(girlPosition[0] - girldoorPosition[0]);
    
    if(distance <= 0.05){ 
        destroy(girl);
       //set_position(gameObject, -9, -4, 0); 
        girldoor = instantiate_sprite('https://raw.githubusercontent.com/xmkdgdz/2d-game/master/images/opendoor.png');
        
        set_start(girldoor, start_girldoor);
        wingirl=true;
    }
    // if(winboy&&wingirl){
    //     gui_label('You win',0,0,5);
    // }
    
}



set_start(boy,start_player);
set_start(girl,start_player);
set_update(boy,update_boy);
set_update(girl,update_girl);


//INTERACTION
function red_touch(self,other){
    if(same_gameobject(other, redwater)){
        set_position(self, -9, -4, 0);
    }
}

function blue_touch(self,other){
    if(same_gameobject(other, bluewater)){
        set_position(self, -9, -4, 0);
    }
}
on_collision_enter(girl,red_touch);
on_collision_enter(boy,blue_touch);






