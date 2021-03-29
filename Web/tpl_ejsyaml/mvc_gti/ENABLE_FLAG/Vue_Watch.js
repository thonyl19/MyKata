'ctr_ENABLE.val'(val) {
    if (this.ctr_ENABLE.enableTrigger) {
        this.UpdateEnableFlag(val);
    }
    this.form.ENABLE_FLAG = val ? 'T' : 'F';
    this.ctr_ENABLE.enableTrigger = true;
},
