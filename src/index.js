// Paste on right click
document.addEventListener('contextmenu', function(e) {
    navigator.clipboard.readText()
    .then(tex => {
        app.cmd = app.cmd.slice(0, app.pos) + tex + app.cmd.slice(app.pos, app.cmd.length)
        app.pos += tex.length;
    })
    
    e.preventDefault();
}, false);

// Copy on selection
document.onmouseup = function (e) {
    var text = '';
    if (window.getSelection) {
        text = window.getSelection();
    } else if (document.getSelection) {
        text = document.getSelection();
    } else if (document.selection) {
        text = document.selection.createRange().text;
    }

    if(text.toString()) {
        navigator.clipboard.writeText(text.toString())
    }
}

document.addEventListener('keydown', (event) => {
    if(event.ctrlKey) {
        switch(event.key){
            case 'a':
                app.pos = 0;
                break
            case 'e':
                app.pos = app.cmd.length;
                break
            case 'd':
            case 'c':
                app.cmd = ''
                app.pos = 0
                break
        }
        event.preventDefault()
        return
    }
    
    console.log("Pressed key:" + event.keyCode)
    switch(event.keyCode){
        case 8: // backspace
            if(app.pos == 0) return
            app.pos--;

        case 46: // delete
            app.cmd = app.cmd.slice(0, app.pos) + app.cmd.slice(app.pos+1, app.cmd.length)
            app.KeyDown()
            return event.preventDefault()

        case 37: // left
            app.pos <= 0 || app.pos--
            return event.preventDefault()

        case 39: // right
            app.pos == app.cmd.length || app.pos++
            return event.preventDefault()

        case 38: // top
            if(app.curr_ptr) {
                app.curr_ptr = false
                app.cmd = app.history[app.history_ptr].description,
                app.pos = app.cmd.length
                return
            }

            if(app.history_ptr > 0) {
                app.history_ptr--
                while(app.history[app.history_ptr].type != 'cmd' && app.history_ptr-- >= 0);
            }

            app.cmd = app.history[app.history_ptr].description,
            app.pos = app.cmd.length
            
            return event.preventDefault()

        case 40: // bottom
            if(app.curr_ptr)
                return

            if(app.history_ptr < app.history.length) {
                app.history_ptr++
                while(app.history_ptr < app.history.length-1 && app.history[++app.history_ptr].type != 'cmd'/* && app.history_ptr++ < app.history.length*/);
                while(app.history[app.history_ptr].type != 'cmd' && app.history_ptr-- >= 0 && (app.curr_ptr = true));
                console.log(app.history_ptr, app.history.length)
            }

            app.cmd = app.history[app.history_ptr].description,
            app.pos = app.cmd.length

            return event.preventDefault()
        case 13: // enter
            app.Enter()

            return event.preventDefault()
        case 9: // tab
            app.Autocomplete()

            return event.preventDefault()
    }
    
    const keycode = event.keyCode;
    var valid = 
        (keycode > 47 && keycode < 58)   || // number keys
        keycode == 32 || keycode == 13   || // spacebar & return key(s) (if you want to allow carriage returns)
        (keycode > 64 && keycode < 91)   || // letter keys
        (keycode > 95 && keycode < 112)  || // numpad keys
        (keycode > 185 && keycode < 193) || // ;=,-./` (in order)
        (keycode > 218 && keycode < 223);   // [\]' (in order)

    if(valid) {
        app.cmd += event.key;
        app.pos += event.key.length;
        app.KeyDown()
    }
});

var app = new Vue({
    el: '#app',
    data: {
        hostname: location.hash == '#router' ? 'Router' : 'Switch',
        enabled: false,
        mode: "",
        cmd: '',
        pos: 0,
        
        help: '',
        helps: '',
        cmds: location.hash == '#router' ? router_cmds : switch_cmds,
        history: [],
        history_ptr: 0,
        curr_ptr: true
    },
    methods: {
        KeyDown() {
            this.helps = []
            this.cmds.forEach(
                (x) => this.helps.push(...x.commands.filter(
                    (cmd) => cmd.enabled == this.enabled
                        && cmd.mode == this.mode
                        && CmdCmpr(this.cmd, cmd.description)
                    )))
            
            //this.helps.sort((a, b) => a.length - b.length)
            let help = CmdMasks(this.cmd, true)
            
            if(help) {
                let ignoreWords = this.cmd.match(/([\s]+)/g)
                ignoreWords = ignoreWords == null ? 0 : ignoreWords.length
                app.help = help.split(' ').slice(ignoreWords).join(' ')
            } else {
                app.help = ''
            }
        },
        Autocomplete() {
            let word = this.cmd.slice(0, this.pos).split(' ')
            word = word[word.length-1]
            
            let newCmd = CmdExpand(this.cmd)
            if(newCmd != this.cmd) {
                this.cmd = newCmd+" "
                this.pos = this.cmd.length
            }

            this.KeyDown()
            console.log("Autocompl: "+word)
        },
        Enter() {
            this.history.push({
                "type": 'cmd',
                "cmd": null,
                "hostname": this.hostname,
                "enabled": this.enabled,
                "mode": this.mode,
                "description": this.cmd
            })

            this.history_ptr = this.history.length-1
            this.curr_ptr = true
            let expand = CmdExpand(this.cmd.trim())
            let exists = CmdMasks(expand, true)

            if(exists) {
                StatesHandler(expand)
                Run(expand)
                this.history.push({
                    "type": 'text',
                    "text": '> '+expand
                })
            } else {
                this.history.push({
                    "type": 'text',
                    "text": '% Unknown command.'
                })
            }
            
            this.cmd = ''
            this.pos = 0
            this.KeyDown()
            setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 0)
        }
    }
});

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
            if(greedy) continue
            else return false
        
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
            && CmdCmpr(short, cmd.description, false)
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
        // ENABLED
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

var Run = (cmd) => {

}
