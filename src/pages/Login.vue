<template>
  <section>
    <form @submit="onSubmit">
    <Field name="email" />
    <span>{{ errors.email }}</span>
    <br />
    <Field name="password" type="text" />
    <span>{{ errors.password }}</span>
    <br />
    <input type="submit" />
  </form>
  </section>
</template>
<script>
import { useAuth } from '@/stores/auth';
import { Field, useForm } from 'vee-validate';
import { useRouter, useRoute } from 'vue-router'

export default {
  components: {
    Field,
  },
  setup() {
    const auth = useAuth();
    const { handleSubmit, errors } = useForm();
    const router = useRouter();
    const route = useRoute();

    const onSubmit = handleSubmit(async (data) => {
      var to = '/app';
      if (route.query.path) {
        to = route.query.path;
      }
      const ok = await auth.doLogin(data);
      if (ok) {
        router.push(to)
      }
    })

    return {
      errors,
      onSubmit
    };
  }
}
</script>
