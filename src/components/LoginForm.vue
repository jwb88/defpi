<template>
  <v-app id="LoginForm">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>

            <v-card flat>

              <v-img src="https://picsum.photos/350/165?random" height="250" class="grey darken-4" ></v-img>

              <v-card-text>
                <v-form>

                  <v-layout align-center justify-center>
                    <v-text-field id="username" prepend-inner-icon="person" name="username" label="Username" type="text" style="max-width: 300px" ></v-text-field>
                  </v-layout>
                    <v-layout align-center justify-center>
                      <v-text-field id="password" prepend-inner-icon="lock" name="password" label="Password" type="password" style="max-width: 300px"></v-text-field>
                    </v-layout>

                    </v-form>
              </v-card-text>

              <v-card-actions>
                <v-layout row wrap align-center>
                  <v-flex class="text-xs-center">

                    <v-layout justify-center>
                      <v-checkbox label="Remember me" style="max-width: 150px" ></v-checkbox>
                    </v-layout>

                    <v-spacer></v-spacer>
					  <router-link to="/"><v-btn ripple color="primary">Login</v-btn></router-link>
                  </v-flex>
                </v-layout>
              </v-card-actions>

				<v-layout align-center justify-center mt-5>
					<v-label>Forgot password?</v-label>
				</v-layout>

            </v-card>

          </v-flex>
        </v-layout>
      </v-container>

      <v-footer app dark height="auto" >
        <v-card class="flex" flat tile >

          <v-card-title class="primary">
            <v-layout justify-center>
              <v-icon medium color="secondary">info</v-icon>
              <v-icon medium color="secondary">email</v-icon>
            </v-layout>
          </v-card-title>

          <v-card-actions class="secondary justify-center">
            &copy;2018 — <strong>dEF-Pi</strong>
          </v-card-actions>

        </v-card>
      </v-footer>

    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'LoginForm',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
