# ---------- Stage 1: Build the app ----------
FROM node:latest AS builder

# Set working directory
WORKDIR /app

# Build-time environment variable for Next.js public API URL
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy the rest of the app
COPY . .

# Build the Next.js app
RUN npm run build

# ---------- Stage 2: Run the app ----------
FROM node:latest AS runner

# Set working directory
WORKDIR /app

# Runtime environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Build-time arg (required for ARG -> ENV bridge)
ARG NEXT_PUBLIC_API_URL

# Install only production dependencies
COPY package.json package-lock.json* ./
RUN npm install --omit=dev

# Copy built app from builder
COPY --from=builder /app/.next .next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
# COPY --from=builder /app/next.config.js ./next.config.js # Uncomment if needed

# Expose port
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "start"]
