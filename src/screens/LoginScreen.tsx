import React from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { colors, fontSizes, spacing } from '../theme/tokens';

// Login do CUIDADOR (o idoso não faz login neste MVP — ver ARCHITECTURE.md
// do backend). Login social (Google/Apple) via SDK nativo entra aqui como
// próximo passo do backend-dev; por ora, só o formulário de e-mail/senha.
export function LoginScreen({ onSubmit }: { onSubmit: (email: string, password: string) => void }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entrar</Text>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput style={styles.input} placeholder="Senha" secureTextEntry value={password} onChangeText={setPassword} />
      <Pressable style={styles.button} onPress={() => onSubmit(email, password)}>
        <Text style={styles.buttonText}>Entrar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: spacing(3), gap: spacing(2), backgroundColor: colors.background },
  title: { fontSize: fontSizes.title, fontWeight: '700', color: colors.textPrimary, marginBottom: spacing(2) },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: spacing(2),
    fontSize: fontSizes.body,
  },
  button: { backgroundColor: colors.brand, borderRadius: 12, padding: spacing(2), alignItems: 'center', marginTop: spacing(2) },
  buttonText: { color: '#FFFFFF', fontSize: fontSizes.label, fontWeight: '600' },
});
