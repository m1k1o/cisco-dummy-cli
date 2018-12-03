// longest common starting substring in an array
function sharedStart(array){
    var A = array.concat().sort(), 
    a1 = A[0], a2 = A[A.length-1], L = a1.length, i= 0;
    while(i<L && a1.charAt(i)=== a2.charAt(i)) i++;
    return a1.substring(0, i);
}

var CmdCmpr = (cmd, mask, greedy = false) => {
    let a_cmd = String(cmd).split(' ')
    let a_mask = String(mask).split(' ')

    for (const i in a_cmd) {
        let w_cmd = a_cmd[i]
        let w_mask = a_mask[i]

        if(typeof w_mask == 'undefined')
            return greedy
        
        // Check for input
        if(w_mask.match(/\<.*\>/))
            continue

        // Check for wildcard
        let wildcard
        if(wildcard = w_mask.match(/\{(.*)\}/)) {
            wildcard = wildcard[1].split('|')

            if(typeof wildcard.find((rule) => rule.startsWith(w_cmd)) === 'undefined')
                return false
                else continue
        }
        
        if(!w_mask.startsWith(w_cmd))
            return false
    }
    
    return true
}

var CmdMasks = (short, wildcard = false) => {
    let cmds = app.cmds.flatMap((x) => x.commands)
    cmds = cmds.filter(
        (cmd) => cmd.enabled == app.enabled
            && cmd.mode == app.mode
            && CmdCmpr(short, cmd.description, typeof cmd.greedy !== "undefined" && cmd.greedy)
    )
    
    if(!wildcard)
        return cmds

    if(cmds.length == 1)
        return cmds[0].description

    cmds.sort((a, b) => a.length - b.length)
    let word = null
    return typeof cmds.find((cmd) => {
        if(word == null) {
            word = cmd.description
            return 0
        }
        
        word = sharedStart([word,  cmd.description])
        return !cmd.description && !word.startsWith(cmd.description)
    }) == 'undefined' ? word : null
}

var CmdExpand = (short) => {
    let cmd = CmdMasks(short, true)
    
    let a_cmd = String(short).split(' ')
    let a_mask = String(cmd).split(' ')
    let result = []
    for (const i in a_cmd) {
        let w_cmd = a_cmd[i]
        let w_mask = a_mask[i]

        if(typeof w_mask == 'undefined'){
            result.push(w_cmd)
            continue
        }
        
        // Check for input
        if(w_mask.match(/\<.*\>/)){
            result.push(w_cmd)
            continue
        }
        // Check for wildcard
        let wildcard
        if(wildcard = w_mask.match(/\{(.*)\}/)) {
            wildcard = wildcard[1].split('|')
            let res = wildcard.find((rule) => rule.startsWith(w_cmd))
            
            if(typeof res === 'undefined')
                result.push(w_cmd)
            else
                result.push(res)
            
            continue
        }
        
        if(!w_mask.startsWith(w_cmd))
            result.push(w_cmd)
        else
            result.push(w_mask)
    }
    
    return result.join(' ')
}

var StatesHandler = (cmd) => {
    console.log("New CMD:" + cmd)
    if(!app.enabled) {
        if(cmd == 'enable') {
            app.enabled = true
            return
        }
        
        return
    }
    
    if(app.mode == '') {
        if(cmd == 'disable' || cmd == 'exit') {
            app.enabled = false
            return
        }
        if(cmd == 'configure terminal') {
            app.mode = 'config'
        }
        return
    }
    
    if(cmd == 'end') {
        app.mode = ''
        return
    }

    if(cmd == 'exit') {
        if(app.mode == 'config-keychain-key') {
            app.mode = 'config-keychain'
            return
        }
        if(app.mode == 'config') {
            app.mode = ''
            return
        }
        app.mode = 'config'
        return
    }

    if(app.mode == 'config') {
        if(m = cmd.match(/^hostname (.*)/)) {
            app.hostname = m[1]
            return
        }
        if(cmd.startsWith('line')) {
            app.mode = 'config-line'
            return
        }
        if(cmd.startsWith('interface')) {
            app.mode = 'config-if'
            return
        }
        if(cmd.startsWith('vlan')) {
            app.mode = 'config-vlan'
            return
        }
        if(cmd.startsWith('router')) {
            app.mode = 'config-router'
            return
        }
        if(cmd.startsWith('key')) {
            app.mode = 'config-keychain'
            return
        }
        return
    }
}
