<!-- <template>
<div class="pa-8 text-center">
<h1 class="text-h3 font-weight-bold mb-4">Save & share links as a team</h1>
<p class="text-body-1 mb-8">Create a team, paste any link, and let LinkHive fetch the title & summary automatically.</p>
<div>
<v-btn to="/register" color="primary" class="mr-3">Get Started</v-btn>
<v-btn to="/login" variant="outlined">I already have an account</v-btn>
</div>
</div>
</template> -->


<template>
  <div>
    <!-- Hero Section -->
    <section class="hero-section text-center pa-12">
      <h1 class="text-h2 font-weight-bold mb-4 gradient-text">
        Save & Share Links as a Team
      </h1>
      <p class="text-body-1 mb-8">
        Create a team, paste any link, and let LinkHive fetch the title & summary automatically.
      </p>
      <div>
        <v-btn to="/register" color="primary" class="mr-3" size="large">
          Get Started
        </v-btn>
        <v-btn to="/login" variant="outlined" size="large">
          I already have an account
        </v-btn>
      </div>
    </section>

    <!-- Illustration Section -->
    <section class="pa-8 text-center">
      <v-img
        src="https://cdn.dribbble.com/userupload/14620197/file/original-c1b52f63c8f19e788c61efb7c56f2441.png"
        max-width="800"
        class="mx-auto rounded-xl shadow-lg"
        alt="App Preview"
      />
    </section>

    <!-- Features Section -->
    <section class="pa-12">
      <h2 class="text-h4 font-weight-bold text-center mb-10">Why LinkHive?</h2>
      <v-container>
        <v-row>
          <v-col cols="12" md="3" v-for="feature in features" :key="feature.title">
            <v-card class="pa-6 text-center feature-card">
              <v-icon :icon="feature.icon" size="36" class="mb-4" color="primary" />
              <div class="text-subtitle-1 font-weight-bold mb-2">{{ feature.title }}</div>
              <p class="text-body-2">{{ feature.desc }}</p>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Footer -->
    <v-footer app class="pa-6 text-center">
      <v-container>
        <p class="mb-1">Made with ❤️ by Team Apexa</p>
        <a href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </v-container>
    </v-footer>
  </div>
</template>

<script setup>
const features = [
  { icon: "mdi-link-variant", title: "Smart Link Previews", desc: "Automatically fetches titles, descriptions & images." },
  { icon: "mdi-account-group", title: "Team Collaboration", desc: "Work together and share useful links instantly." },
  { icon: "mdi-folder-multiple", title: "Organized Collections", desc: "Keep everything neat with team-specific collections." },
  { icon: "mdi-cellphone-link", title: "Cross-Device Access", desc: "Use on any device, anytime, anywhere." },
]
</script>

<style scoped>
.hero-section {
  background: linear-gradient(135deg, #1e1e2f, #2d2d44);
  color: white;
  border-radius: 0 0 40px 40px;
}

.gradient-text {
  background: linear-gradient(90deg, #4facfe, #00f2fe);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.feature-card {
  border-radius: 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
}
</style>
