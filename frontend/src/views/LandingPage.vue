<template>
  <v-parallax
    height="100vh"
    src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop"
  >
    <div class="d-flex flex-column fill-height justify-center align-center text-white" style="background-color: rgba(0, 0, 0, 0.6);">
      <div class="text-center pa-4" style="max-width: 800px;">
        <v-icon size="80" class="mb-6">mdi-lan</v-icon>
        
        <h1 class="text-h2 font-weight-black mb-4" style="text-shadow: 2px 2px 8px rgba(0,0,0,0.7);">
          TeamReads
        </h1>
        
        <p class="text-h5 font-weight-light mb-8">
          The single source of truth for your team's most valuable links and resources.
        </p>
        
        <div class="d-flex justify-center flex-wrap">
          <v-btn
            color="primary"
            size="x-large"
            class="ma-2 px-8"
            to="/signup"
            elevation="8"
          >
            Create Your Workspace
          </v-btn>
          <v-btn
            variant="outlined"
            size="x-large"
            class="ma-2 px-8"
            to="/login"
          >
            Login
          </v-btn>
        </div>
      </div>
    </div>
  </v-parallax>
</template>

<script setup>
// Purely a visual component, no script needed.
</script>