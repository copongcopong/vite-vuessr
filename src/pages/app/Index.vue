<template>
  <h1>The Main App Home page</h1>
  <p>
    {{JSON.stringify(me)}}
  </p>
  <p>
    {{JSON.stringify(auth.get('timer.ctr'))}}
  </p>
  <p>
    {{JSON.stringify(auth.$data.timer?.ctr)}}
  </p>
  <hr />
  <p>
    {{JSON.stringify(test.$data)}}
  </p>

</template>
<script>
import { useAuth } from '@/hooks/app/auth';
import { useTest } from '@/hooks/app/test';
import { onMounted, onUnmounted } from 'vue';
import { useAppUtils } from '@/hooks/app/utils';

export default {
  async setup() {
    const { $ax } = useAppUtils();
    const auth = useAuth();
    const me = auth.$data;
    const test = useTest();
    var ctr, ctr2;

      
  
    
    onMounted(async () => {
      
     //var resp = await $ax.get('ajax/call');
      test.set('countdown.ctr', 0)
      ctr = setInterval(() => {

        test.incrementCtr();
        ctr2 = test.get('countdown.ctr')
        if (ctr2 > 5) {
          test.call(new Date())
        }

      }, 2000);
    });
    onUnmounted(() => {
      clearInterval(ctr)
    })
    
    return {
      me, auth, test
    }
  }
}
</script>