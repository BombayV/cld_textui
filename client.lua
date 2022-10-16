local callback
local activeNotification = false
local KEYS = {
  ["E"] = 38
}

local function onPersist(key)
  if callback then
    CreateThread(function()
      while true do
        if IsControlJustReleased(0, key) then
          SendNUIMessage({
            type = "HIDE"
          })
          callback(key, ("Key %s was pressed"):format(key))
          callback = nil
          break
        end
        Wait(0)
      end
    end)
  end
end

local function showPersist(message, key, cb)
  local findKey = key:upper()
  if activeNotification then
    SendNUIMessage({
      type = "UPDATE_TEXT",
      body = {
        message = message,
        key = findKey
      }
    })
    print(("Updated text to %s"):format(message))
    return
  end

  activeNotification = true
  SendNUIMessage({
    type = "SHOW",
    body = {
      message = message,
      key = findKey
    }
  })

  if cb then
    callback = cb
    onPersist(KEYS[findKey])
  end
end

local function hidePersist()
  if not activeNotification then
    return
  end
  SendNUIMessage({
    type = "HIDE"
  })
  activeNotification = false
  if callback then
    callback(nil, "HIDDEN")
    callback = nil
  end
end

exports('showPersist', showPersist)
exports('hidePersist', hidePersist)


--[[
 -- Uses keys from the KEYS table
  exports['cld_textui']:showPersist("Open door", "E", function(result, msg)
    print(result)
    print(msg)
  end)

  -- Custom use
  CreateThread(function()
    local ped = PlayerPedId()
    while true do
      if
      Wait(0)
    end
  end)
]]--