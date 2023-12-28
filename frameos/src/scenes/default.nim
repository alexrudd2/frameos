# This code is autogenerated

import pixie, json, times, strformat

from frameos/types import FrameOS, FrameScene, ExecutionContext
from frameos/logger import log
import apps/unsplash/app as unsplashApp
import apps/text/app as textApp
import apps/code/app as nodeapp_d25623be_36d3_4053_b02f_bebe189bc858App
import apps/clock/app as clockApp
import apps/downloadImage/app as downloadImageApp

let DEBUG = false

type Scene* = ref object of FrameScene
  app_cbef1661_d2f5_4ef8_b0cf_458c3ae11200: unsplashApp.App
  app_b94c5793_aeb1_4f3a_b273_c2305c12096e: textApp.App
  app_d25623be_36d3_4053_b02f_bebe189bc858: nodeapp_d25623be_36d3_4053_b02f_bebe189bc858App.App
  app_1c9414bd_8bc4_4249_8ffb_1b3094715a06: clockApp.App
  app_ddbd3753_ea6a_4a80_98b4_455fb623ef6b: downloadImageApp.App

{.push hint[XDeclaredButNotUsed]: off.}
proc runNode*(self: Scene, nodeId: string,
    context: var ExecutionContext) =
  let scene = self
  let frameOS = scene.frameOS
  let frameConfig = frameOS.frameConfig
  let state = scene.state
  var nextNode = nodeId
  var currentNode = nodeId
  var timer = epochTime()
  while nextNode != "-1":
    currentNode = nextNode
    timer = epochTime()
    case nextNode:
    of "cbef1661-d2f5-4ef8-b0cf-458c3ae11200":
      self.app_cbef1661_d2f5_4ef8_b0cf_458c3ae11200.run(context)
      nextNode = "-1"
    of "b94c5793-aeb1-4f3a-b273-c2305c12096e":
      self.app_b94c5793_aeb1_4f3a_b273_c2305c12096e.appConfig.text = &"Welcome to FrameOS!\nResolution: {context.image.width} x {context.image.height} .. " &
          scene.state{"magic"}.getStr()
      self.app_b94c5793_aeb1_4f3a_b273_c2305c12096e.appConfig.position = "top-left"
      self.app_b94c5793_aeb1_4f3a_b273_c2305c12096e.run(context)
      nextNode = "1c9414bd-8bc4-4249-8ffb-1b3094715a06"
    of "d25623be-36d3-4053-b02f-bebe189bc858":
      self.app_d25623be_36d3_4053_b02f_bebe189bc858.run(context)
      nextNode = "-1"
    of "1c9414bd-8bc4-4249-8ffb-1b3094715a06":
      self.app_1c9414bd_8bc4_4249_8ffb_1b3094715a06.run(context)
      nextNode = "-1"
    of "ddbd3753-ea6a-4a80-98b4-455fb623ef6b":
      self.app_ddbd3753_ea6a_4a80_98b4_455fb623ef6b.run(context)
      nextNode = "b94c5793-aeb1-4f3a-b273-c2305c12096e"
    else:
      nextNode = "-1"
    if DEBUG:
      self.logger.log(%*{"event": "runApp", "node": currentNode, "ms": (-timer +
          epochTime()) * 1000})

proc dispatchEvent*(self: Scene, context: var ExecutionContext) =
  case context.event:
  of "render":
    self.runNode("ddbd3753-ea6a-4a80-98b4-455fb623ef6b", context)
  of "init":
    self.runNode("d25623be-36d3-4053-b02f-bebe189bc858", context)
  else: discard

proc init*(frameOS: FrameOS): Scene =
  var state = %*{}
  let frameConfig = frameOS.frameConfig
  let logger = frameOS.logger
  let scene = Scene(frameOS: frameOS, frameConfig: frameConfig, logger: logger, state: state)
  let self = scene
  var context = ExecutionContext(scene: scene, event: "init", eventPayload: %*{
    }, image: newImage(1, 1))
  result = scene
  scene.app_cbef1661_d2f5_4ef8_b0cf_458c3ae11200 = unsplashApp.init(
      "cbef1661-d2f5-4ef8-b0cf-458c3ae11200", scene, unsplashApp.AppConfig(
      cacheSeconds: 60.0, keyword: "birds"))
  scene.app_b94c5793_aeb1_4f3a_b273_c2305c12096e = textApp.init(
      "b94c5793-aeb1-4f3a-b273-c2305c12096e", scene, textApp.AppConfig(
      borderWidth: 2, fontColor: parseHtmlColor("#ffffff"), fontSize: 64.0,
      text: &"Welcome to FrameOS!\nResolution: {context.image.width} x {context.image.height} .. " &
      scene.state{"magic"}.getStr(), position: "top-left", offsetX: 0.0,
      offsetY: 0.0, padding: 10.0, borderColor: parseHtmlColor("#000000")))
  scene.app_d25623be_36d3_4053_b02f_bebe189bc858 = nodeapp_d25623be_36d3_4053_b02f_bebe189bc858App.init(
      "d25623be-36d3-4053-b02f-bebe189bc858", scene,
      nodeapp_d25623be_36d3_4053_b02f_bebe189bc858App.AppConfig(keyword: ""))
  scene.app_1c9414bd_8bc4_4249_8ffb_1b3094715a06 = clockApp.init(
      "1c9414bd-8bc4-4249-8ffb-1b3094715a06", scene, clockApp.AppConfig(
      position: "bottom-center", format: "HH:mm:ss", formatCustom: "",
      offsetX: 0.0, offsetY: 0.0, padding: 10.0, fontColor: parseHtmlColor(
      "#ffffff"), fontSize: 32.0, borderColor: parseHtmlColor("#000000"),
      borderWidth: 1))
  scene.app_ddbd3753_ea6a_4a80_98b4_455fb623ef6b = downloadImageApp.init(
      "ddbd3753-ea6a-4a80-98b4-455fb623ef6b", scene, downloadImageApp.AppConfig(
      url: "http://10.4.0.11:4999/", scalingMode: "cover", cacheSeconds: 60.0))
  dispatchEvent(scene, context)

proc render*(self: Scene): Image =
  var context = ExecutionContext(
    scene: self,
    event: "render",
    eventPayload: %*{},
    image: case self.frameConfig.rotate:
    of 90, 270: newImage(self.frameConfig.height, self.frameConfig.width)
    else: newImage(self.frameConfig.width, self.frameConfig.height)
  )
  dispatchEvent(self, context)
  return context.image
{.pop.}
