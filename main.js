// Holds the data structure for all the context menus used in the app
const CONTEXT_MENU_CONTENTS = {
  inCurrentTab: 'Open in current tab',
  inNewTab: 'Open in new tab',
}

function setUpContextMenus() {
  console.log(`Running..........`)
  Object.entries(CONTEXT_MENU_CONTENTS).forEach(function ([key, text]) {
    chrome.contextMenus.create({
      title: text,
      type: 'normal',
      id: key,
      visible: true,
      targetUrlPatterns: ['https://github.com/*'],
      contexts: ['link'],
    })
  })
}

chrome.runtime.onInstalled.addListener(function () {
  setUpContextMenus()
})

chrome.contextMenus.onClicked.addListener((info) => {
  // linkUrl: "https://github.com/WajuAbolarin/tweetz-api"
  // menuItemId: "inCurrentTab"
  const { linkUrl, menuItemId } = info
  switch (menuItemId) {
    case 'inCurrentTab':
      chrome.tabs.executeScript({
        code: `document.location = "${linkUrl.replace(`github.com`, `github1s.com`)}" `,
      })
      break

    case 'inNewTab':
      chrome.tabs.create({
        url: linkUrl.replace(`github.com`, `github1s.com`),
        active: true,
      })
      break

    default:
      break
  }
})
