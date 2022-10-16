local callback
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
  SendNUIMessage({
    type = "HIDE"
  })
  if callback then
    callback(nil, "HIDDEN")
    callback = nil
  end
end

exports('showPersist', showPersist)
exports('hidePersist', hidePersist)

-- exports['cld_textui']:showPersist("Open Door", "A", function(result, message)
--   print(result, message)
-- end)