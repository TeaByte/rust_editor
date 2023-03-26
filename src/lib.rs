use wasm_bindgen::prelude::*;
use web_sys::console::log_1 as log;
use base64::{decode, encode};
use image::load_from_memory;
use image::ImageOutputFormat::Png;
use std::io::Cursor;

#[wasm_bindgen]
pub fn grapscale(encoded_file: &str, filter: &str, slider_int: i32, slider_float: f32) -> String {

    log(&filter.into());

    let base64_to_vec = decode(encoded_file).unwrap();
    let mut img = load_from_memory(&base64_to_vec).unwrap();

    match filter {
        "gray" => img = img.grayscale(),
        "blur" => img = img.blur(slider_float),
        "contrast" => img = img.adjust_contrast(slider_float),
        "brightness" => img = img.brighten(slider_int),
        "rotate" => img = img.huerotate(slider_int),
        "test" => img = img.huerotate(slider_int),
        _ => img = img
    };

    let mut buffer = Cursor::new(vec![]);
    img.write_to(&mut buffer, Png).unwrap();

    let encoded_img = encode(&buffer.into_inner());
    let data_url = format!(
        "data:image/png;base64,{}",
        encoded_img
    );
    
    data_url
}