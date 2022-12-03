import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Badge, ListGroup, Popover, OverlayTrigger } from "react-bootstrap";

import supabaseClient from "../utils/supabaseClient";
import { Navigate, useLocation } from "react-router-dom";

import ProfileServices from "../core/ProfileServices";
import LogsServices from "../core/LogServices";
import loading_icon from "../images/loading.svg";

function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update the state to force render
}

async function updateDB(id, state) {
  await supabaseClient.from("Logs").update({ DELIVERED: state }).eq("IDCT", id);
}
async function updateDB2(IDTC, NAME, IMAGE, PRICE, STOCK, REFSHEET, CATEGORY, LOC) {
  await supabaseClient.from("Components").insert([{ IDCOMPONENT: IDTC, NAME: NAME, IMAGE: IMAGE, PRICE: PRICE, STOCK: STOCK, REFSHEET: REFSHEET, CATEGORY: CATEGORY, LOC: LOC }]);
}

function StoreLogs() {
  const [logs, setLogs] = useState(undefined);
  const [teams, setTeams] = useState(undefined);
  const [loading, setLoading] = useState(true);

  const forceRefresh = useForceUpdate();

  function add_components() {
    var string =
      "102***Resistência 15kΩ***https://mauser.pt/images/601ecd1fba2a64c7abdd8792da286565.jpg***113***21******resistências***Loja 0 [0, 4]*********+*+103***Resistância 150kΩ***https://mauser.pt/images/601ecd1fba2a64c7abdd8792da286565.jpg***120***21******resistências***Loja 0 [0, 5]*********+*+104***Resistência 820Ω***https://mauser.pt/images/601ecd1fba2a64c7abdd8792da286565.jpg***100***20******resistências***Loja 0 [3, 6]*********+*+105***Resistência 270kΩ***https://mauser.pt/images/601ecd1fba2a64c7abdd8792da286565.jpg***210***21******resistências***Loja 0 [2, 1]*********+*+106***Resistência 12Ω***https://mauser.pt/images/601ecd1fba2a64c7abdd8792da286565.jpg***90***20******resistências***Loja 0 [0, 2]*********+*+107***Resistência 680 kΩ***https://mauser.pt/images/601ecd1fba2a64c7abdd8792da286565.jpg***280***21******resistências***Loja 0 [3, 5]*********+*+108***Resistência 2.7Ω***https://mauser.pt/images/601ecd1fba2a64c7abdd8792da286565.jpg***110***20******resistências***Loja 0 [2, 0]*********+*+109***Resistência 5.1Ω***https://mauser.pt/images/601ecd1fba2a64c7abdd8792da286565.jpg***95***21******resistências***Loja 0 [3, 1]*********+*+110***Resistência 20 Ω***https://mauser.pt/images/601ecd1fba2a64c7abdd8792da286565.jpg***84***21******resistências***Loja 0 [1, 2]*********+*+111***Resistência 100 Ω***https://mauser.pt/images/601ecd1fba2a64c7abdd8792da286565.jpg***110***20******resistências***Loja 0 [ ?, ?]*********+*+112***Módulo Transmissor Infravermelho - KY-005***https://arduinomodules.info/wp-content/uploads/KY-005_infrared_transmitter_arduino_module-240x240.jpg***1900***1***https://arduinomodules.info/ky-005-infrared-transmitter-sensor-module/***sensor***Loja 6*********+*+113***Módulo Sensor Campo Magnético - KY-035***https://joy-it.net/files/files/Produkte/SEN-KY035BM/KY-035.png***1300***2***https://joy-it.net/de/products/SEN-KY035BM***sensor***Loja 6*********+*+114***Módulo Detetor de Choque - KY-002***https://www.ptrobotics.com/19123-thickbox_default/sensor-de-vibracao-ky-002.jpg***2640***2******sensor***Loja 6*********+*+115***Módulo fotoresistor - KY-018***https://images.tcdn.com.br/img/img_prod/650361/modulo_sensor_de_luminosidade_fotoresistancia_ldr_ky_018_3661_1_0bf71118dcccbac7dece67af1d8c3722.jpg***1500***2***https://datasheetspdf.com/pdf/1402029/Joy-IT/KY-018/1***sensor***Loja 6*********+*+116***Módulo Sensor Campo Magnético de Hall - KY-003***https://www.filipeflop.com/wp-content/uploads/2017/07/9SS13-3-2.jpg***1690***2***https://datasheetspdf.com/pdf/1321961/Joy-IT/KY003/1***sensor***Loja 6*********+*+117***Módulo Sensor Temperatura - KY-013***https://arduinomodules.info/wp-content/uploads/ky-013_analog_temperature_sensor_module.jpg***1050***2***https://datasheetspdf.com/pdf/1402026/Joy-IT/KY-013/1***sensor***Loja 6*********+*+118***Módulo Potenciómetro - KY-040***https://blogmasterwalkershop.com.br/wp-content/uploads/2018/12/img00_como_usar_com_arduino_modulo_encoder_rotativo_ky_040_pulso_pwm_quadrado_botao_push.png***1900***2***https://datasheetspdf.com/datasheet/KY-040.html***sensor***Loja 6*********+*+119***Módulo Buzzer Passivo - KY-006***https://www.thegeekpub.com/wp-content/uploads/2019/04/List-of-Arduino-Sensors-0012-KY-006-Passive-Piezo-Buzzer-module.jpg***2100***2***https://datasheetspdf.com/datasheet/KY-006.html***sensor***Loja 6*********+*+120***Módulo Sensor Magnético Reed Mini - KY-021***https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRiFNNzhzJY0L36Zlp6DFRozaajbNEzERgeI7LpbtAerQNT12JyuSRcyY9DaGjUIqL1o0VWjgmBfMlUGqvK240CHd5BYMuW9AkuM4zDHWyvom2bJ5b0AHdVdw&usqp=CAE***2280***2***https://datasheet4u.com/datasheet-pdf/Joy-IT/KY-021/pdf.php?id=1402032***sensor***Loja 6*********+*+121***Módulo Detetor de Obstáculos - KY-032***https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQZmCTZJKmieJETu1IK1uYTFUNWN4cXxzXdFl6NFUd1HuIe_2wbn8YpsLZ3zYSy93kXU5dMlTISDB3XhoZi-WohiCg4QxhdufMeYRKABpdcsBAjB1MddRd3&usqp=CAE***880***1***https://datasheetspdf.com/pdf/1402042/Joy-IT/KY-032/1***sensor***Loja 6*********+*+122***Módulo Sensor de Toque Metálico - KY-036***https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRmojtwTntH8feaul82F_0239aO7lyUnSg1Iv_vmKb-zoobdKO7eh-Gje76WHzkna4PK5qZBgzkRSsWq5uY-UhXp8rMPXJQY0WJaE6XjtgkFZKROKJuB1BW&usqp=CAE***3600***2***https://datasheetspdf.com/pdf/1402046/Joy-IT/KY-036/1***sensor***Loja 6*********+*+123***Módulo Sensor Microfone - KY-037***https://www.google.com/url?url=https://s.click.aliexpress.com/deep_link.htm%3Faff_short_key%3DUneMJZVf%26dl_target_url%3Dhttps%253A%252F%252Fwww.aliexpress.com%252Fitem%252F1005003512358597.html%253F_randl_currency%253DEUR%2526_randl_shipto%253DPT%2526src%253Dgoogle&rct=j&q=&esrc=s&sa=U&ved=0ahUKEwiFzILBw9z7AhUL4oUKHct8D5sQ1SkIhAgoAA&usg=AOvVaw2Yr9upLZCsACP-_mKt7CLE***460***2***https://datasheetspdf.com/pdf/1402047/Joy-IT/KY-037/1***sensor***Loja 6*********+*+124***Módulo Sensor de chama - KY-026***https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRTK-TgyP62rFwTrfasBzRT2LaCV3acglNk0ufCzGjrjzkjRiRVGqZc32JML_DVxg-ogHkRnu0HjtqwWrQFoi9p_YZYgALGtTrf9LH1h4cLNdz7lTSTeBgs&usqp=CAE***3000***2***https://datasheetspdf.com/pdf/1402037/Joy-IT/KY-026/1***sensor***Loja 6*********+*+125***Módulo Barómetro - KY-052***https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcThmMUBs8i3t1b61DdS_C507zMTDcWsYQVujoghWv4xotgeNu4DG8zk86RnYC57FxkeWaucWrYokokRLMooZMx8KrOBRBf77E3bV_HONJ6QvfPItr_fE3hZxg&usqp=CAE***890***2***https://datasheetspdf.com/datasheet/KY-052.html***sensor***Loja 6*********+*+126***Módulo Sensor Temperatura - KY-001***https://datasheetspdf.com/datasheet/KY-001.html***500***1***https://www.google.com/url?url=https://s.click.aliexpress.com/deep_link.htm%3Faff_short_key%3DUneMJZVf%26dl_target_url%3Dhttps%253A%252F%252Fwww.aliexpress.com%252Fitem%252F1005001616899566.html%253F_randl_currency%253DEUR%2526_randl_shipto%253DPT%2526src%253Dgoogle&rct=j&q=&esrc=s&sa=U&ved=0ahUKEwjamK_pw9z7AhV5hc4BHVhkDdkQ1SkIvwcoAA&usg=AOvVaw17z5kxUJUAyU2Fpro1EOlo***sensor***Loja 6*********+*+127***Módulo Sensor de Choque - KY-031***https://cdn.datasheetspdf.com/pdfhtml/0101/1402041/page-000001.png***700***2***https://datasheetspdf.com/pdf/1402041/Joy-IT/KY-031/1***sensor***Loja 6*********+*+128***Módulo Sensor de Batimento Cardíaco - KY-039***https://www.google.com/url?url=https://www.elecbee.com/pt-25362-KY-039-Finger-Detection-Heartbeat-Sensor-Module-Finger-Detect-Measurement%3Fsrsltid%3DAYJSbAfDvh0cojJ9TTP7II4tATYz-UvHjBtiQOKuE28P68CNXfKkwoYL4_Q&rct=j&q=&esrc=s&sa=U&ved=0ahUKEwje642ixNz7AhV2hM4BHfJGDKsQ1SkIxQcoAA&usg=AOvVaw2TYMLJCDsavg_RZ1jtelbl***560***2***https://datasheetspdf.com/pdf/1402049/Joy-IT/KY-039/1***sensor***Loja 6*********+*+129***Módulo LED 2 Cores (Vermelho + Verde) - KY-029***https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRgdL4oNEd2iXb27lVEPZIuqY0OljtWSNoLVchIEmE4r27WFqudIkXdpAJPqd_uleraH007ikd-UeX6OE1cHQicDahdYteTmReblh8W2TQVPLcV2kk9_mdy&usqp=CAE***1230***1***https://datasheetspdf.com/datasheet/KY-029.html***sensor***Loja 6*********+*+130***Módulo Sensor de Som (Microfone) - KY-038***https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRmojtwTntH8feaul82F_0239aO7lyUnSg1Iv_vmKb-zoobdKO7eh-Gje76WHzkna4PK5qZBgzkRSsWq5uY-UhXp8rMPXJQY0WJaE6XjtgkFZKROKJuB1BW&usqp=CAE***3300***1***https://datasheetspdf.com/datasheet/KY-038.html***sensor***Loja 6*********+*+131***Sensor de Temperatura (Termístor) - KY-028***https://arduinomodules.info/wp-content/uploads/KY-028_Digital_temperature_module_arduino.jpg***1785***2***https://datasheetspdf.com/pdf/1402039/Joy-IT/KY-028/1***sensor***Loja 6*********+*+132***Módulo Sensor de Inclinação - KY-020***https://arduinomodules.info/wp-content/uploads/KY-020_tilt_switch_module_arduino-240x240.jpg***2090***2***https://datasheetspdf.com/pdf/1402031/Joy-IT/KY-020/1***sensor***Loja 6*********+*+133***Módulo Buzzer Ativo - KY-012***https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcT9H6Ati7-W4CK3vHX03czBHSZw57xBR5kOqfsB5hoJiLyD6q2_JQFf2dBM81aFWIUasrqvGQIOrA4oL9JrupxSrHQ0w4-dNHhkA4vFvNqnNOQNaBTuyN8H&usqp=CAE***940***1***https://datasheetspdf.com/datasheet/KY-012.html***sensor***Loja 6*********+*+134***Módulo Sensor Campo Magnético Linear de Hall - KY-024***https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSmYVwaD4XzkydWqPXDfQgHkeDcYRyoen2LPX1Atn0F5HSI4Rc9ziurcVGKzkd1Wl_FmVmPGnPcHBqIjiNkvNlvMOUOFwtPokGcvHxoXZXJmeOFBMwM0pv8HQ&usqp=CAE***600***2***https://datasheetspdf.com/datasheet/KY-024.html***sensor***Loja 6*********+*+135***Módulo Sensor Magnético de Reed - KY-025***https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRwwY9Eias8XfZDhz0H35mzd19C1zIudoGZ2fuJbzt4tyAfGLYCUFDczhtsF18zuGp4MKxovXZookIP483hnYNwqI9bGzGXpSotzpBxiO1V8Ss66bCNvvXT&usqp=CAE***530***2***https://datasheet4u.com/datasheet-pdf/Joy-IT/KY-025/pdf.php?id=1402036***sensor***Loja 6*********+*+136***Módulo Tradutor de Tensão - KY-051***https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUBkdGdNwyuDHkLjBDzrNmgXGj1mGyBcY_AzTxYU_NJA&s***1220***2***https://datasheetspdf.com/datasheet/KY-051.html***sensor***Loja 6*********+*+137***Módulo LED RGB SMD - KY-009***https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSXf-IXsz0MZzGPZe-saJDIN11rKZxnR79Yiq29tf_ZypbuUXbw_MjDiWM08WU9D3Xf_4kD_ZgJfr73dUNJoGjbYTmT0tmz9kTTU2VCsFi5XqEZ1uOF9hOu&usqp=CAE***1290***2***https://datasheetspdf.com/datasheet/KY-009.html***sensor***Loja 6*********+*+138***Módulo Botão - KY-004***https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRCGbdVqUY0qpcPB45HLX5ALAoX8dRkklkQyWV4p0uFXnRF_qSFXajr0xzD0BoCoCVzabQ048bsRdvJI8tfJvWDNiXpojWZvNuJwS7zWleTMRiXPNDp9uNlyuk&usqp=CAE***1100***2***https://datasheet4u.com/datasheet-pdf/Joy-IT/KY-004/pdf.php?id=1402019***sensor***Loja 6*********+*+139***Módulo LED Mágico - KY-027***https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRhX_lL3PY2LM1UmintDtJTLrQ7MhA5nKThmgy1FFllf-KQtUEI7uKO_hzLu45rQRpWOENb-Kpt2U2gasHM-f-f_duIA8YsmD288w16Zo5fsIFi-j-zkjqc&usqp=CAE***670***4***https://datasheetspdf.com/pdf/1402038/Joy-IT/KY-027/1***sensor***Loja 6*********+*+140***Módulo LED 7 Cores - KY-034***https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQ-CDOTrWmFh9pCeUWAd54tgQydiKBBcchcXULer7g3KscZzQI581AYdJ9EQqARsO5m09rDNKCyfDmFXkl6bk82NrxIgMzkGsm8dQcJx9rP99rhNiFoJg4hgQ&usqp=CAE***1780***1***https://datasheetspdf.com/pdf/1402044/Joy-IT/KY-034/1***sensor***Loja 6*********+*+141***Módulo ADC - KY-053***https://joy-it.net/files/files/Produkte/COM-KY053ADC/KY-053-3.png***2130***2***https://datasheetspdf.com/pdf/1402054/Joy-IT/KY-053/1***sensor***Loja 6*********+*+142***Módulo Acopolador Ótico - KY-010***https://m.media-amazon.com/images/I/61RojPNEhcL._SX342_.jpg***1200***2***https://datasheetspdf.com/pdf/1402023/Joy-IT/KY-010/1***sensor***Loja 6*********+*+143***Módulo de Inclinação - KY-017***https://steps2make.com/wp-content/uploads/2017/10/KY-017-Tilt-Switch.jpg***1360***2***https://datasheetspdf.com/datasheet/KY-017.html***sensor***Loja 6*********+*+144***Módulo LED 5mm 2 cores (Vermelho + Verde) - KY-011***https://sensorkit.joy-it.net/files/files/sensors/KY-011/KY-011.png***170***2***https://datasheetspdf.com/pdf/1402024/Joy-IT/KY-011/1***leds***Loja 6*********+*+145***Condensador 100 uF 16V***https://mauser.pt/images/46f1dcdb997f07ae510d37865dd31aa7.jpg***250***9***https://mauser.pt/catalog/product_info.php?cPath=324_249_253&products_id=004-1216***condensadores***Loja 7*********+*+146***Condensador 22 uF 25V***https://mauser.pt/images/17d55c9c9523d289a55a89839d7a06b7.jpg***100***10***https://mauser.pt/catalog/product_info.php?cPath=324_249_253&products_id=004-0036***condensadores***Loja 7*********+*+147***Condensador 3.3 uF 50V***https://mauser.pt/images/63a99733492348931fb0b5e904c32505.jpg***100***10***https://mauser.pt/catalog/product_info.php?cPath=324_249_253&products_id=004-0782***condensadores***Loja 7*********+*+148***Condensador 2.2 uF 50V***https://mauser.pt/images/1fdead6f33b3959b9248ea8b5633f505.jpg***480***10***https://mauser.pt/catalog/product_info.php?cPath=324_249_253&products_id=004-0594***condensadores***Loja 7*********+*+149***Condensador 330 uF 16V***https://mauser.pt/images/ac3f41bc81b73443e7ee7bc17d429e7c.jpg***210***10***https://mauser.pt/catalog/product_info.php?cPath=324_249_253&products_id=004-0145***condensadores***Loja 7*********+*+150***Condensador 4.7 uF 50V***https://mauser.pt/images/ac3f41bc81b73443e7ee7bc17d429e7c.jpg***130***10***https://mauser.pt/catalog/product_info.php?cPath=324_249_253&products_id=004-0042***condensadores***Loja 7*********+*+151***Condensador 1 uF 50V***https://mauser.pt/images/45d19fa323bfb72449436829396c6f9d.jpg***100***10***https://mauser.pt/catalog/product_info.php?cPath=324_249_254&products_id=004-0946***condensadores***Loja 7*********+*+152***Condensador 470 uF 16V***https://mauser.pt/images/ac3f41bc81b73443e7ee7bc17d429e7c.jpg***150***10***https://mauser.pt/catalog/product_info.php?cPath=324_249_253&products_id=004-0158***condensadores***Loja 7*********+*+153***Condensador 22 pF***https://mauser.pt/images/d93e360da348e3e83b26cad2e53eb1d6.jpg***100***10***https://mauser.pt/catalog/product_info.php?cPath=324_249_254&products_id=004-5093***condensadores***Loja 7*********+*+154***Condensador 47 uF***https://mauser.pt/images/ac3f41bc81b73443e7ee7bc17d429e7c.jpg***110***10******condensadores***Loja 7*********+*+155***Condensador 10 uF***https://mauser.pt/images/ac3f41bc81b73443e7ee7bc17d429e7c.jpg***70***10******condensadores***Loja 7*********+*+156***Condensador 33 uF***https://mauser.pt/images/ac3f41bc81b73443e7ee7bc17d429e7c.jpg***840***10******condensadores***Loja 7*********+*+157***Condensador 2200 uF***https://mauser.pt/images/ac3f41bc81b73443e7ee7bc17d429e7c.jpg***590***3******condensadores***Loja 7*********+*+158***Condensador 100 nF***https://mauser.pt/images/ac3f41bc81b73443e7ee7bc17d429e7c.jpg***100***10******condensadores***Loja 7*********+*+159***Condensador 220 uF***https://mauser.pt/images/ac3f41bc81b73443e7ee7bc17d429e7c.jpg***130***10******condensadores***Loja 7*********+*+160***Condensador 15 pF***https://mauser.pt/images/ac3f41bc81b73443e7ee7bc17d429e7c.jpg***80***10******condensadores***Loja 7*********+*+161***Suporte 28 pinos***https://mauser.pt/images/8667499617cfd3491182e1e02182595c.jpg***250***5***https://mauser.pt/catalog/product_info.php?cPath=324_393_1149&products_id=012-0009***breadboards***Loja 7*********+*+162***Suporte 14 pinos***https://mauser.pt/images/e4cb56adb8ab2c0ca6046849c41a02dc.jpg***470***20***https://mauser.pt/catalog/product_info.php?cPath=324_393_1150&products_id=012-0014***breadboards***Loja 7*********+*+163***Transístor 3904***https://mauser.pt/images/732fc17f05f60f4e79eb926dc7e826b1.jpg***100***15***https://mauser.pt/catalog/product_info.php?cPath=324_247&products_id=002-0323***transistor***Loja 7*********+*+164***Transístor 2907***https://mauser.pt/images/8b0dcb3fb2d108896d8e9c8a1c9ea824.jpg***790***15***https://mauser.pt/catalog/product_info.php?cPath=324_247&products_id=002-0628***transistor***Loja 7*********+*+165***Transístor 2222A***https://mauser.pt/images/732fc17f05f60f4e79eb926dc7e826b1.jpg***690***2***https://mauser.pt/catalog/product_info.php?cPath=324_247&products_id=002-0093***transistor***Loja 7*********+*+166***Barra de 20 pinos dupla macho 2.54mm***https://mauser.pt/images/851dd27624e56c25f627e05dc70d86ca.jpg***490***2***https://mauser.pt/catalog/product_info.php?cPath=1874_640_2570_792&products_id=012-0043***breadboards***Loja 7*********+*+167***Barra de 2 pinos (1x2) macho 2.0mm***https://mauser.pt/images/ba9bf1f4c3dcabbb602f8590bce7ab7f.jpg***51***14***https://mauser.pt/catalog/product_info.php?cPath=1874_640_2570_792&products_id=012-0059***breadboards***Loja 7*********+*+168***Barra de 3 pinos (1x3) macho 2.0mm***https://mauser.pt/images/5909bde4a36dfdfa92b9d057760ed88e.jpg***100***1***https://mauser.pt/catalog/product_info.php?cPath=1874_640_2570_2571&products_id=012-0167***breadboards***Loja 7*********+*+169***Barra de 40 pinos (2x20) macho ***https://mauser.pt/images/a2af7b2ab55e0084c166d9aec0490405.jpg***2360***1***https://mauser.pt/catalog/product_info.php?cPath=1874_640_2570_2572&products_id=012-0199***breadboards***Loja 7*********";
    var lines = string.split("+*+");

    lines.forEach((line) => {
      var lineArray = line.split("***");

      var IDCT = lineArray[0];
      var NAME = lineArray[1];
      var IMAGE = lineArray[2];
      var PRICE = lineArray[3];
      var STOCK = lineArray[4];
      var REFSHEET = lineArray[5];
      var CATEGORY = lineArray[6];
      var LOC = lineArray[7];
      console.log(IDCT, NAME, IMAGE, PRICE, STOCK, REFSHEET, CATEGORY, LOC);

      updateDB2(IDCT, NAME, IMAGE, PRICE, STOCK, REFSHEET, CATEGORY, LOC);
    });
  }

  function changeState(e) {
    e = e.target;
    let id = e.id;
    let state = e.value == "on" ? true : false;
    console.log(id);
    console.log(state);
    updateDB(id, state);

    let newLogs = [...logs];
    newLogs.forEach((log) => {
      if (log.IDCT == id) {
        log.DELIVERED = state;
      }
    });
    setLogs(newLogs);
  }

  useState(() => {
    ProfileServices.getTeams(setTeams);
    LogsServices.getLogs().then((logs) => {
      setLogs(logs);
      setTimeout(function () {
        forceRefresh();
        setLoading(false);
      }, 5000);
    });
  }, []);

  let location = useLocation();
  if (supabaseClient.auth.user() === null) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (loading || teams === undefined) {
    return (
      <div style={{ display: "flex", width: "100vw", justifyContent: "center" }}>
        <img src={loading_icon} style={{ height: "43vh" }} alt="loading" />
      </div>
    );
  } else {
    console.log(logs);
    return (
      <Container fluid style={{ display: "flex", flexDirection: "row", alignItems: "center", height: "calc(100vh - 68px - 43px)" }}>
        <button onClick={add_components}>Update</button>
        <h1
          style={{
            writingMode: "tb-rl",
            color: "#f48ee5",
            transform: "rotate(180deg)",
          }}
        >
          Store Logs:
        </h1>
        <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "80vh", overflow: "auto" }}>
          {logs.map((log) => {
            return (
              <Card key={`card-${log.IDCT}`} className="logsCard" style={{ width: "100%", display: "flex", flexDirection: "row" }}>
                <div style={{ width: "30%" }}>
                  {teams.map((team) => {
                    if (team.IDTEAM === log.IDTEAM) {
                      return (
                        <div key={`div-${log.IDCT}`} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                          <h3 key={`h3-${log.IDCT}`}> {team.NAME}</h3>
                          <img key={`img3-${log.IDCT}`} style={{ width: "150px" }} src={team.IMAGE}></img>
                        </div>
                      );
                    }
                  })}
                </div>
                <div style={{ flexGrow: "1" }}>
                  {log.COMPONENTS.map((component) => {
                    return (
                      <ListGroup.Item key={`li-${log.IDCT}-${component.NAME}`} as="li" style={{ display: "flex" }}>
                        <div key={`${component.NAME}-div`} className="ms-2 me-auto">
                          <OverlayTrigger
                            trigger={["hover", "focus"]}
                            key={"bottom"}
                            placement={"bottom"}
                            overlay={
                              <Popover
                                key={`${component.NAME}-overlay`}
                                id={`popover-positioned-${"bottom"}`}
                                style={{ backgroundColor: " rgb(9, 1, 59)", background: "linear-gradient(180deg, rgba(9, 1, 59, 1) 51%, rgba(54, 36, 98, 1) 100%)" }}
                              >
                                <Popover.Header key={`${component.NAME}-overlay-header`} as="h3" style={{ backgroundColor: "rgba(9, 1, 59, 1)!important" }}>
                                  Clica para aceder a datasheet
                                </Popover.Header>
                                <Popover.Body key={`${component.NAME}-overlay-body`}>
                                  <img key={component.IMAGE} alt="" style={{ maxWidth: "100%" }} src={component.IMAGE}></img>
                                </Popover.Body>
                              </Popover>
                            }
                          >
                            <a key={component.REFSHEET} href={component.REFSHEET} target="_blank" rel="noreferrer" style={{ color: "white" }}>
                              {component.NAME}
                            </a>
                          </OverlayTrigger>
                        </div>
                        <Badge key={component.NAME} variant="primary" pill>
                          {component.QUANTITY}
                        </Badge>
                      </ListGroup.Item>
                    );
                  })}
                </div>
                <div style={{ display: "flex", flexDirection: "column", color: "white" }}>
                  <label>Entregue?</label>
                  <input id={log.IDCT} checked={log.DELIVERED} onChange={(e) => changeState(e)} type="checkbox"></input>
                </div>
              </Card>
            );
          })}
        </div>
      </Container>
    );
  }
}
export default StoreLogs;
