from rest_framework import viewsets
from django.db import models
from rest_framework.permissions import IsAuthenticated
from .models import Contact
from .serializers import ContactSerializer


class ContactViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Contact.objects.order_by("name")
    serializer_class = ContactSerializer

    def get_queryset(self):
        qs = super().get_queryset()

        # Get only contact about current authenticated user
        qs = qs.filter(user=self.request.user)

        # Add search capabilities
        search = self.request.query_params.get("search", None)
        if search:
            qs = qs.filter(
                models.Q(name__icontains=search)
                | models.Q(phone__icontains=search)
                | models.Q(email__icontains=search)
            )

        return qs