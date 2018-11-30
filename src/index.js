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

var Run = (cmd) => {

}
