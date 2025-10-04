# Políticas Legales (PLANTILLAS)

⚠️ **IMPORTANTE:** Estos son documentos de ejemplo que deben ser revisados y adaptados por un abogado especializado en protección de datos según las leyes de tu país/región.

## 📋 Documentos Necesarios

Para cumplir con la normativa (GDPR en Europa, LOPD en España), necesitas:

1. **Política de Privacidad** - Cómo tratas los datos personales
2. **Términos y Condiciones** - Condiciones de uso del servicio
3. **Política de Cookies** - Si usas cookies (Google Analytics, etc.)
4. **Aviso Legal** - Información sobre la entidad

## 📄 Plantilla: Política de Privacidad

### POLÍTICA DE PRIVACIDAD

**Última actualización:** [FECHA]

#### 1. RESPONSABLE DEL TRATAMIENTO

-   **Denominación:** [NOMBRE DE LA ASOCIACIÓN]
-   **CIF:** [CIF]
-   **Dirección:** [DIRECCIÓN COMPLETA]
-   **Email:** [EMAIL DE CONTACTO]
-   **Teléfono:** [TELÉFONO]

#### 2. DATOS QUE RECOPILAMOS

Recopilamos los siguientes datos personales:

-   **Datos de identificación:** Nombre completo, DNI/NIF/NIE
-   **Datos de contacto:** Email, teléfono, dirección postal
-   **Datos de pago:** Información procesada por Stripe/PayPal (no almacenamos números de tarjeta)

#### 3. FINALIDAD DEL TRATAMIENTO

Sus datos personales se utilizan para:

-   Gestionar su inscripción como socio
-   Procesar el pago de la cuota de inscripción
-   Mantener un registro de socios
-   Comunicaciones relacionadas con la asociación

#### 4. LEGITIMACIÓN

El tratamiento de sus datos se basa en:

-   Su consentimiento explícito al enviar el formulario
-   Ejecución del contrato de membresía
-   Obligaciones legales de la asociación

#### 5. DESTINATARIOS

Sus datos pueden ser compartidos con:

-   **Stripe/PayPal:** Para procesar pagos
-   **Google:** Para almacenamiento en Google Sheets
-   No se ceden datos a terceros sin su consentimiento

#### 6. CONSERVACIÓN

Sus datos se conservarán:

-   Durante su membresía activa
-   [X años] adicionales tras finalizar la membresía
-   Según lo exija la normativa fiscal y contable

#### 7. DERECHOS

Puede ejercer sus derechos de:

-   **Acceso:** Conocer qué datos tenemos sobre usted
-   **Rectificación:** Corregir datos inexactos
-   **Supresión:** Solicitar la eliminación de sus datos
-   **Oposición:** Oponerse al tratamiento
-   **Portabilidad:** Recibir sus datos en formato estructurado
-   **Limitación:** Solicitar limitar el tratamiento

Para ejercer estos derechos, contacte con: [EMAIL]

#### 8. SEGURIDAD

Implementamos medidas técnicas y organizativas para proteger sus datos:

-   Transmisión cifrada (HTTPS)
-   Acceso restringido a datos personales
-   Procesadores de pago certificados PCI DSS

#### 9. COOKIES

[Si aplica] Este sitio web utiliza cookies. Consulte nuestra Política de Cookies.

#### 10. AUTORIDAD DE CONTROL

Tiene derecho a presentar una reclamación ante:

**España:** Agencia Española de Protección de Datos (www.aepd.es)
**UE:** Su autoridad local de protección de datos

---

## 📄 Plantilla: Términos y Condiciones

### TÉRMINOS Y CONDICIONES DE USO

**Última actualización:** [FECHA]

#### 1. ACEPTACIÓN

Al utilizar este sitio web y solicitar la inscripción como socio, acepta estos términos y condiciones.

#### 2. OBJETO

El presente formulario permite la inscripción como socio de [NOMBRE ASOCIACIÓN].

#### 3. CUOTA DE INSCRIPCIÓN

-   **Importe:** [MONTO] EUR
-   **Concepto:** Cuota anual de socio
-   **Renovación:** [Explicar si es anual, mensual, etc.]

#### 4. PROCESO DE PAGO

-   Los pagos se procesan mediante Stripe o PayPal
-   El pago es no reembolsable una vez confirmado
-   [Excepciones si las hay]

#### 5. DERECHOS Y OBLIGACIONES DEL SOCIO

**Derechos:**

-   [Listar derechos del socio]
-   Acceso a actividades de la asociación
-   Participación en asambleas

**Obligaciones:**

-   Proporcionar información veraz
-   Mantener actualizada su información de contacto
-   Cumplir con los estatutos de la asociación

#### 6. CANCELACIÓN

Para cancelar su membresía:

-   Notificar por escrito a [EMAIL]
-   [Condiciones de cancelación]

#### 7. MODIFICACIONES

Nos reservamos el derecho de modificar estos términos. Las modificaciones se notificarán con [X días] de antelación.

#### 8. JURISDICCIÓN

Estos términos se rigen por la legislación española. Cualquier disputa se resolverá en los tribunales de [CIUDAD].

---

## 📄 Plantilla: Política de Cookies

### POLÍTICA DE COOKIES

**Última actualización:** [FECHA]

#### ¿QUÉ SON LAS COOKIES?

Las cookies son pequeños archivos que se almacenan en su dispositivo cuando visita un sitio web.

#### COOKIES QUE UTILIZAMOS

**Cookies Esenciales:**

-   Necesarias para el funcionamiento del sitio
-   No se pueden desactivar

**Cookies de Análisis:**

-   [Si usas Google Analytics]
-   Permiten mejorar el sitio
-   Pueden desactivarse

#### CÓMO GESTIONAR COOKIES

Puede configurar su navegador para rechazar cookies:

-   **Chrome:** Configuración → Privacidad → Cookies
-   **Firefox:** Opciones → Privacidad → Cookies
-   **Safari:** Preferencias → Privacidad

---

## 📄 Plantilla: Aviso Legal

### AVISO LEGAL

#### 1. DATOS IDENTIFICATIVOS

De conformidad con la LSSI, se informa:

-   **Titular:** [NOMBRE ASOCIACIÓN]
-   **CIF:** [CIF]
-   **Domicilio:** [DIRECCIÓN]
-   **Email:** [EMAIL]
-   **Inscrita en:** [Registro donde está inscrita]

#### 2. OBJETO

Este sitio web tiene como objeto facilitar la inscripción de socios.

#### 3. PROPIEDAD INTELECTUAL

Todos los contenidos (textos, imágenes, diseño) son propiedad de [NOMBRE ASOCIACIÓN] y están protegidos por leyes de propiedad intelectual.

#### 4. RESPONSABILIDAD

[NOMBRE ASOCIACIÓN] no se responsabiliza de:

-   Interrupciones del servicio
-   Errores en el procesamiento de pagos por parte de terceros
-   Uso indebido del sitio web

---

## 🔧 Implementación en el Sitio Web

### 1. Crear Páginas de Políticas

Crear archivos en `frontend/src/pages/`:

-   `PrivacyPolicy.jsx`
-   `TermsConditions.jsx`
-   `CookiePolicy.jsx`
-   `LegalNotice.jsx`

### 2. Agregar Enlaces

En el formulario (`HomePage.jsx`), agregar:

```jsx
<div className="text-xs text-gray-500 mt-4">
    Al continuar, aceptas nuestra{' '}
    <Link to="/politica-privacidad" className="text-blue-600 hover:underline">
        Política de Privacidad
    </Link>{' '}
    y{' '}
    <Link to="/terminos" className="text-blue-600 hover:underline">
        Términos y Condiciones
    </Link>
</div>
```

### 3. Agregar Rutas

En `App.jsx`:

```jsx
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsConditions from './pages/TermsConditions'

// En las rutas
<Route path="/politica-privacidad" element={<PrivacyPolicy />} />
<Route path="/terminos" element={<TermsConditions />} />
```

### 4. Checkbox de Aceptación

En el formulario, agregar:

```jsx
<div className="flex items-center">
    <input type="checkbox" id="acceptTerms" required className="mr-2" />
    <label htmlFor="acceptTerms" className="text-sm">
        He leído y acepto la{' '}
        <Link to="/politica-privacidad" target="_blank">
            Política de Privacidad
        </Link>{' '}
        y los{' '}
        <Link to="/terminos" target="_blank">
            Términos y Condiciones
        </Link>
    </label>
</div>
```

---

## ⚠️ AVISO IMPORTANTE

Estos documentos son **PLANTILLAS GENÉRICAS** y deben ser:

1. **Revisados por un abogado** especializado en protección de datos
2. **Adaptados** a tu asociación específica
3. **Actualizados** según cambios en la legislación
4. **Publicados** de forma accesible en tu sitio web

### Recursos Adicionales

-   **España:** [AEPD - Agencia Española de Protección de Datos](https://www.aepd.es)
-   **UE:** [GDPR Info](https://gdpr-info.eu/)
-   **Generadores online:** Existen herramientas que generan políticas básicas, pero siempre deben ser revisadas por un profesional

### Consultoría Legal

Se recomienda contratar:

-   Abogado especializado en protección de datos
-   Delegado de Protección de Datos (DPO) si aplica
-   Auditoría de cumplimiento GDPR/LOPD

---

**Última actualización de estas plantillas:** Octubre 2025

**Disclaimer:** Estas plantillas son orientativas y no constituyen asesoramiento legal. Consulte con un profesional legal antes de usar cualquiera de estos documentos.
