<script>
    import Axios from 'util/service';

    export default {
        props: {
            name: {
                type: String,
                required: true,
            },
        },
        data() {
            return {
                fakeData: null,
            };
        },
        mounted() {
            Axios.get(`http://localhost:8080/api/schema/${ this.name }`)
                .then((response) => {
                    this.fakeData = response.data;
                });
        },

        render() {
            if (this.fakeData) {
                return this.$scopedSlots.default(this.fakeData);
            }
            return null;
        },
    };
</script>
