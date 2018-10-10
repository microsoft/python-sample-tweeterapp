from rest_framework import permissions


class IsAuthorOrReadOnly(permissions.BasePermission):
    """
    Permission that allows only the author to edit
    tweets attributed to them
    """

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            # Allow read only permissions to any user
            # to view the tweet
            return True
        else:
            # Check that the request user owns the object
            # being edited
            return obj.user == request.user