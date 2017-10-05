export default {
  methods: {
    transInternationalPhone: phone => `+81${phone.replace(/^0/, '')}`,
  },
};
