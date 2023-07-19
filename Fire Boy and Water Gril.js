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
get_main_camera_following_target,remove_collider_components } from "unity_academy";

init_unity_academy_2d();




const main_cam_target = get_main_camera_following_target();



//start basic map
const background=instantiate_sprite('https://raw.githubusercontent.com/xmkdgdz/2d-game/main/images/background.png');
const ground1=instantiate_sprite('https://raw.githubusercontent.com/xmkdgdz/2d-game/main/images/ground1.png');
const ground2=instantiate_sprite('https://raw.githubusercontent.com/xmkdgdz/2d-game/main/images/ground1.png');
const ground3=instantiate_sprite('https://raw.githubusercontent.com/xmkdgdz/2d-game/main/images/ground1.png');
const ground4=instantiate_sprite('https://raw.githubusercontent.com/xmkdgdz/2d-game/main/images/ground1.png');

function start_background(gameObject) {
    remove_collider_components(gameObject);
    set_position(gameObject, 0, 0, 0);
    set_scale(gameObject,2,2,0);
}

function start_ground(gameObject){
    set_position(gameObject, -2, 0, 0);

}

start_ground(ground1);


// const start_ground = (gameObject) => set_position(gameObject, 0, -2, 0);
// const start_ground1 = (gameObject) => set_position(gameObject, 3, -1, 0);
// const start_ground2 = (gameObject) => set_position(gameObject, 6, 0, 0);
// const start_wall1 = (gameObject) => {
//     set_position(gameObject, -6, 1.8, 0);
//     set_rotation_euler(gameObject, 0, 0, 90);
// };
// const start_wall2 = (gameObject) => {
//     set_position(gameObject, 8.75, 1.6, 0);
//     set_rotation_euler(gameObject, 0, 0, 90);
// };


// const start_slope = (gameObject) =>{
//     set_position(gameObject, -4, -1, 0);
//     set_rotation_euler(gameObject, 0, 0, -10);
// };

// const start_mystery_box = (gameObject) =>{
//     set_position(gameObject, 1, 1.5, 0);
// };

// const start_mushroom = (gameObject) =>{
//     set_position(gameObject, 1, 2.5, 0);
//     apply_rigidbody(gameObject);
// };











set_start(background,start_background);
set_start(ground1,start_ground);


//PLAYER


const boy = instantiate_sprite('https://raw.githubusercontent.com/xmkdgdz/2d-game/main/images/boy.png');
const girl = instantiate_sprite('https://raw.githubusercontent.com/xmkdgdz/2d-game/main/images/girl.png'); 

//start player
function start_player(gameObject){
    set_position(gameObject, 0, 0, 0);
    set_scale(gameObject, 0.5, 0.5, 1);
    apply_rigidbody(gameObject);
}

//player move
function update_boy(gameObject){
    
    const moveSpeed = 3;
    
    // Player: move and jump
    if(get_key("A")){
        translate_world(gameObject, -delta_time() * moveSpeed, 0, 0);
    }
    if(get_key("D")){
        translate_world(gameObject, delta_time() * moveSpeed, 0, 0);
    }
    if(get_key("W") && math_abs(get_velocity(gameObject)[1]) <= 0.05){
        add_impulse_force(gameObject, 0, 5, 0);
    }

    set_rotation_euler(gameObject, 0, 0, 0);
    
    copy_position(gameObject, main_cam_target, 0, 0, Infinity);
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
    
    copy_position(gameObject, main_cam_target, 0, 0, Infinity);
}

set_start(boy,start_player);
set_start(girl,start_player);
set_update(boy,update_boy);
set_update(girl,update_girl);



// set_start(ground, start_ground);
// set_start(ground1, start_ground1);
// set_start(ground2, start_ground2);
// set_start(wall1, start_wall1);
// set_start(wall2, start_wall2);
// set_start(slope, start_slope);
// set_start(mystery_box, start_mystery_box);
// set_start(mario, start_player);
// set_update(mario, update_player);
// on_collision_enter(mario, marioOnCollisionEnter);